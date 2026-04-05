from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, Header, HTTPException, Request, status
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.db.session import get_db
from app.deps import get_current_user
from app.models import User, Workspace, WorkspaceMember

router = APIRouter(tags=["billing"])


class CheckoutBody(BaseModel):
    plan: str = Field(pattern="^(professional|business)$")


@router.post("/workspaces/{workspace_id}/billing/checkout")
def create_checkout(
    workspace_id: UUID,
    body: CheckoutBody,
    user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
) -> dict[str, str]:
    settings = get_settings()
    if not settings.stripe_secret_key:
        raise HTTPException(
            status.HTTP_503_SERVICE_UNAVAILABLE,
            "Stripe is not configured (set STRIPE_SECRET_KEY and price IDs)",
        )
    import stripe

    stripe.api_key = settings.stripe_secret_key
    m = (
        db.query(WorkspaceMember)
        .filter(
            WorkspaceMember.workspace_id == workspace_id,
            WorkspaceMember.user_id == user.id,
            WorkspaceMember.role == "owner",
        )
        .first()
    )
    if not m:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Workspace not found or not owner")
    ws = db.get(Workspace, workspace_id)
    assert ws
    price = (
        settings.stripe_price_professional
        if body.plan == "professional"
        else settings.stripe_price_business
    )
    if not price:
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, "Stripe price ID not set")
    if not ws.stripe_customer_id:
        cust = stripe.Customer.create(email=user.email, metadata={"workspace_id": str(workspace_id)})
        ws.stripe_customer_id = cust.id
        db.commit()
    session = stripe.checkout.Session.create(
        mode="subscription",
        customer=ws.stripe_customer_id,
        line_items=[{"price": price, "quantity": 1}],
        success_url=f"{settings.app_url}/app/billing?success=1",
        cancel_url=f"{settings.app_url}/app/billing?canceled=1",
        metadata={"workspace_id": str(workspace_id), "plan": body.plan},
    )
    return {"url": session.url or ""}


@router.post("/webhooks/stripe")
async def stripe_webhook(
    request: Request,
    db: Annotated[Session, Depends(get_db)],
    stripe_signature: Annotated[str | None, Header(alias="Stripe-Signature")] = None,
) -> dict[str, str]:
    settings = get_settings()
    if not settings.stripe_webhook_secret:
        raise HTTPException(status.HTTP_503_SERVICE_UNAVAILABLE, "Webhook not configured")
    import stripe

    payload = await request.body()
    try:
        event = stripe.Webhook.construct_event(
            payload, stripe_signature or "", settings.stripe_webhook_secret
        )
    except Exception:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Invalid signature") from None

    if event["type"] == "checkout.session.completed":
        sess = event["data"]["object"]
        wid = sess.get("metadata", {}).get("workspace_id")
        plan = sess.get("metadata", {}).get("plan")
        if wid and plan:
            ws = db.get(Workspace, UUID(wid))
            if ws:
                ws.plan_tier = plan
                ws.subscription_status = "active"
                ws.stripe_subscription_id = sess.get("subscription")
                db.commit()
    if event["type"] == "customer.subscription.deleted":
        sub = event["data"]["object"]
        cid = sub.get("customer")
        ws = db.query(Workspace).filter(Workspace.stripe_customer_id == cid).first()
        if ws:
            ws.plan_tier = "starter"
            ws.subscription_status = "canceled"
            db.commit()

    return {"received": "true"}

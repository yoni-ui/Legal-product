from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import auth, billing, chat, documents, insights, templates, workspaces

app = FastAPI(title="Tebekaye API", version="0.2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(workspaces.router)
app.include_router(documents.router)
app.include_router(insights.router)
app.include_router(chat.router)
app.include_router(templates.router)
app.include_router(billing.router)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    database_url: str = "postgresql+psycopg://tebekaye:tebekaye_dev@localhost:5432/tebekaye"
    jwt_secret: str = "change-me-in-production-use-long-random-string"
    jwt_algorithm: str = "HS256"
    jwt_exp_hours: int = 168

    upload_dir: str = "./data/uploads"
    app_url: str = "http://localhost:3000"
    api_public_url: str = "http://localhost:8000"

    openai_api_key: str = ""
    stripe_secret_key: str = ""
    stripe_webhook_secret: str = ""
    stripe_price_professional: str = ""
    stripe_price_business: str = ""


@lru_cache
def get_settings() -> Settings:
    return Settings()

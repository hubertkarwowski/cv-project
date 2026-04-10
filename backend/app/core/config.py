from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import ClassVar, Literal
from pydantic import HttpUrl, PostgresDsn, computed_field
from pathlib import Path


class Settings(BaseSettings):
    env_path: ClassVar[Path] = Path(__file__).resolve().parents[2] / ".env"
    model_config = SettingsConfigDict(
        env_file=env_path, env_ignore_empty=True, extra="ignore"
    )
    API_V1_STR: str = "/api/v1"
    FRONTEND_HOST: str = "http://localhost:5173"
    ENVIRONMENT: Literal["dev", "production"] = "dev"

    PROJECT_NAME: str = "CV Project"
    SENTRY_DSN: HttpUrl | None = None
    POSTGRES_SERVER: str
    POSTGRES_PORT: int = 5432
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str = ""
    POSTGRES_DB: str = ""

    @computed_field  # type: ignore[prop-decorator]
    @property
    def SQLALCHEMY_DATABASE_URI(self) -> PostgresDsn:
        return PostgresDsn.build(
            scheme="postgresql+pg8000",
            username=self.POSTGRES_USER,
            password=self.POSTGRES_PASSWORD,
            host=self.POSTGRES_SERVER,
            port=self.POSTGRES_PORT,
            path=self.POSTGRES_DB,
        )


settings = Settings()

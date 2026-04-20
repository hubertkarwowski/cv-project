from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, validates

from app.db.db import Base

class Skills(Base):
    __tablename__ = "skills"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    skills: Mapped[str] = mapped_column(String(500), nullable=False)
    languages: Mapped[str] = mapped_column(String(500), nullable=False)
    certificates: Mapped[str | None] = mapped_column(String(500), nullable=True)
    courses: Mapped[str | None] = mapped_column(String(500), nullable=True)

    @validates("skills", "languages")
    def validate_required_fields(self, key: str, value: str) -> str:
        if not value or not value.strip():
            raise ValueError(f"Field {key} cannot be empty.")

        stripped = value.strip()
        if not (3 <= len(stripped) <= 500):
            raise ValueError(f"Pole {key} musi mieć od 3 do 500 znaków. Podano: {len(stripped)}")

        return stripped

    @validates("certificates", "courses")
    def validate_optional_fields(self, key: str, value: str | None) -> str | None:
        if value is None or not value.strip():
            return None

        stripped = value.strip()
        if not (3 <= len(stripped) <= 500):
            raise ValueError(f"Pole {key} musi mieć od 3 do 500 znaków. Podano: {len(stripped)}")

        return stripped
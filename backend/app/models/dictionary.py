from app.db.db import Base
from sqlalchemy import Enum, Integer, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, validates
from app.schemas.Dictionary import DictionaryCategory


class Dictionary(Base):
    __tablename__ = "dictionaries"
    __table_args__ = (
        UniqueConstraint("category", "code", name="uq_dictionary_category_code"),
    )
    id: Mapped[int] = mapped_column(Integer, nullable=False, primary_key=True)
    category: Mapped[DictionaryCategory] = mapped_column(
        Enum(DictionaryCategory, name="dictionary_category_enum"),
        index=True,
        nullable=False,
    )
    code: Mapped[str] = mapped_column(String(50), nullable=False)
    label: Mapped[str] = mapped_column(String(50), nullable=False)
    sort_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    @validates("code")
    def validate_code(self, key: str, value: str) -> str:
        if not value or not value.strip():
            raise ValueError("Cannot be empty")
        return value.strip().lower()

    @validates("label")
    def validate_label(self, key: str, value: str) -> str:
        if not value or not value.strip():
            raise ValueError("Cannot be empty")
        return value.strip()

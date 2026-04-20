from datetime import date

from sqlalchemy import Date, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, validates

from app.db.db import Base

class WorkExperience(Base):
    __tablename__ = "work_experiences"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    position: Mapped[str] = mapped_column(String(50), nullable=False)
    company: Mapped[str] = mapped_column(String(50), nullable=False)
    location: Mapped[str | None] = mapped_column(String(50), nullable=True)

    start_date: Mapped[date] = mapped_column(Date, nullable=False)
    end_date: Mapped[date | None] = mapped_column(Date, nullable=True)

    description: Mapped[str] = mapped_column(Text, nullable=False)


    @validates("position")
    def validate_position(self, key: str, value: str) -> str:
        if not value or not value.strip():
            raise ValueError("Empty")
        stripped = value.strip()
        if not (3 <= len(stripped) <= 50):
            raise ValueError(f"Title must be between 3 and 50 characters long: {len(stripped)}")
        return stripped.title()


    @validates("company")
    def validate_company(self, key: str, value: str) -> str:
        if not value or not value.strip():
            raise ValueError("Empty")
        stripped = value.strip()
        if not (3 <= len(stripped) <= 50):
            raise ValueError(f"Title must be between 3 and 50 characters long: {len(stripped)}")
        return stripped.title()

    @validates("start_date")
    def validate_start_date(self, key: str, value: date) -> date:
        if value is None:
            raise ValueError("Data rozpoczęcia jest wymagana.")

        if value < date(1950, 1, 1):
            raise ValueError(f"Data rozpoczęcia jest zbyt odległa: {value}")

        if value > date.today():
            raise ValueError(f"Data rozpoczęcia nie może być z przyszłości: {value}")

        return value

    @validates("end_date")
    def validate_end_date(self, key: str, value: date | None) -> date | None:
        if value is None:
            return None

        if value > date.today():
            pass

        if self.start_date and value < self.start_date:
            raise ValueError(
                f"Data zakończenia ({value}) nie może być wcześniejsza "
                f"niż data rozpoczęcia ({self.start_date})."
            )
        return value

    @validates("location")
    def validate_location(self, key: str, value: str) -> str:
        if not value or not value.strip():
            raise ValueError("Empty")
        stripped = value.strip()
        if len(stripped) > 50:
            raise ValueError(f" long: {len(stripped)}")
        return stripped.title()


    @validates("description")
    def validate_description(self, key: str, value: str) -> str:
        if not value or not value.strip():
            raise ValueError("Opis stanowiska nie może być pusty.")
        stripped = value.strip()
        if not (10 <= len(stripped) <= 500):
            raise ValueError(f"Opis musi mieć od 10 do 500 znaków. Podano: {len(stripped)}")
        return stripped

from datetime import date

from sqlalchemy import Date, Enum, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, validates

from app.db.db import Base
from app.schemas.User import Gender


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    first_name: Mapped[str] = mapped_column(String(30), nullable=False)
    last_name: Mapped[str] = mapped_column(String(50), nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    phone_number: Mapped[str] = mapped_column(String(16), nullable=False)
    postal_code: Mapped[str | None] = mapped_column(String(6), nullable=True)
    date_of_birth: Mapped[date] = mapped_column(Date, nullable=False)
    gender: Mapped[Gender | None] = mapped_column(
        Enum(Gender, name="gender_enum"), nullable=True
    )
    city: Mapped[str | None] = mapped_column(String(50), nullable=True)
    citizenship: Mapped[str | None] = mapped_column(String(100), nullable=True)
    website_url: Mapped[str | None] = mapped_column(String(200), nullable=True)


    @validates("first_name")
    def validate_first_name(self, key: str, value: str) -> str:
        if not value or not value.strip():
            raise ValueError("Imię nie może być puste.")
        return value.strip().title()

    @validates("last_name")
    def validate_last_name(self, key: str, value: str) -> str:
        if not value or not value.strip():
            raise ValueError("Nazwisko nie może być puste.")
        return value.strip().title()

    @validates("city")
    def validate_city(self, key: str, value: str | None) -> str | None:
        if value is None:
            return None
        stripped = value.strip()
        if not stripped:
            return None
        return stripped.title()

    @validates("date_of_birth")
    def validate_date_of_birth(self, key: str, value: date) -> date:
        if value is None:
            raise ValueError("Data urodzenia jest wymagana.")

        today = date.today()
        # Obliczamy pełne lata z uwzględnieniem dnia i miesiąca
        age = (
            today.year - value.year
            - ((today.month, today.day) < (value.month, value.day))
        )

        if age < 18:
            raise ValueError(
                f"Rejestracja dozwolona wyłącznie dla osób pełnoletnich. "
                f"Podany wiek: {age} lat."
            )
        return value

    @validates("email")
    def validate_email(self, key: str, value: str) -> str:
        if not value or not value.strip():
            raise ValueError("Adres e-mail nie może być pusty.")
        email = value.strip().lower()
        if "@" not in email or "." not in email.split("@")[-1]:
            raise ValueError(f"Nieprawidłowy format adresu e-mail: '{email}'.")
        return email

    @validates("phone_number")
    def validate_phone_number(self, key: str, value: str) -> str:
        if not value or not value.strip():
            raise ValueError("Numer telefonu nie może być pusty.")
        # Usuwamy spacje i myślniki, zostawiamy cyfry i opcjonalny znak '+'
        cleaned = value.strip().replace(" ", "").replace("-", "")
        digits = cleaned.lstrip("+")
        if not digits.isdigit():
            raise ValueError(
                f"Numer telefonu może zawierać tylko cyfry, spacje, myślniki "
                f"i opcjonalny prefix '+': '{value}'."
            )
        return cleaned

    @validates("postal_code")
    def validate_postal_code(self, key: str, value: str | None) -> str | None:
        if value is None:
            return None
        cleaned = value.strip().replace("-", "")
        if not cleaned.isdigit() or len(cleaned) != 5:
            raise ValueError(
                f"Kod pocztowy musi składać się z 5 cyfr (format: XX-XXX): '{value}'."
            )
        # Normalizujemy do formatu XX-XXX
        return f"{cleaned[:2]}-{cleaned[2:]}"

    @validates("website_url")
    def validate_website_url(self, key: str, value: str | None) -> str | None:
        if value is None:
            return None
        stripped = value.strip()
        if not stripped:
            return None
        if not (stripped.startswith("http://") or stripped.startswith("https://")):
            raise ValueError(
                f"URL strony musi zaczynać się od 'http://' lub 'https://': '{stripped}'."
            )
        return stripped

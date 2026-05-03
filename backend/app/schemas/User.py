from datetime import date
from enum import Enum
from typing import Optional
from pydantic import BaseModel, ConfigDict, EmailStr, Field, HttpUrl, field_validator


class Gender(str, Enum):
    MALE = "male"
    FEMALE = "female"
    OTHER = "other"


class UserBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    first_name: str = Field(min_length=3, max_length=30)
    last_name: str = Field(min_length=3, max_length=50)
    email: EmailStr = Field(max_length=255)
    phone_number: str = Field(pattern=r"^\+\d{7,15}$")
    postal_code: Optional[str] = Field(default=None, pattern=r"^\d{2}-\d{3}$")
    date_of_birth: date
    gender: Optional[Gender] = None
    city: Optional[str] = Field(default=None, min_length=3, max_length=50)
    citizenship: Optional[str] = Field(default=None, max_length=100)
    website_url: Optional[HttpUrl] = None

    @field_validator("first_name", "last_name", "city", mode="before")
    @classmethod
    def capitalize_name_fields(cls, v: str | None) -> str | None:
        if v is None:
            return v
        return v.strip().capitalize()

    @field_validator("website_url", mode="before")
    @classmethod
    def validate_url_length(cls, v: str | None) -> str | None:
        if v is None:
            return v
        if len(v) > 200:
            raise ValueError("URL must be 200 characters or fewer")
        return v

    @field_validator("date_of_birth")
    @classmethod
    def must_be_adult(cls, v: date) -> date:
        today = date.today()
        age = today.year - v.year - ((today.month, today.day) < (v.month, v.day))
        if age < 18:
            raise ValueError("User must be at least 18 years old")
        return v


class UserResponseSchema(UserBase):
    model_config = ConfigDict(from_attributes=True)

    id: int

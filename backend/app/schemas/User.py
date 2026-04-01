from datetime import date
from enum import Enum
from pydantic import BaseModel, EmailStr, Field, HttpUrl
from typing import Optional


class Gender(str, Enum):
    MALE = "male"
    FEMALE = "female"
    OTHER = "other"


class User(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: EmailStr
    phone_number: str = Field(pattern=r"^\+\d{7,15}$")
    postal_code: Optional[str] = Field(default=None, pattern=r"^\d{2}-\d{3}$")
    date_of_birth: date
    gender: Optional[Gender] = None
    city: Optional[str] = None
    citizenship: Optional[str] = None
    website_url: Optional[HttpUrl] = None

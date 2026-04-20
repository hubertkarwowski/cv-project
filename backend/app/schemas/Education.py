from datetime import date
from typing import Optional, Self
from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator


class EducationValidator:
    @field_validator('degree_level','field_of_study','institution','description', mode="before")
    @classmethod
    def capitalize_name_fields(cls, v: str) -> str:
        if v is None:
            return v
        return v.strip().capitalize()

    @model_validator(mode="after")
    def validate_dates(self) -> Self: # Użyj Self zamiast nazwy klasy
        start = getattr(self, "start_date", None)
        end = getattr(self, "end_date", None)

        if start and end and start > end:
            raise ValueError("Data zakończenia nie może być wcześniejsza niż data rozpoczęcia.")
        return self


class EducationBase(BaseModel, EducationValidator):
    model_config = ConfigDict(from_attributes=True)

    degree_level: str = Field(..., min_length=3, max_length=50)
    field_of_study: str = Field(..., min_length=3, max_length=50)
    institution: str = Field(..., min_length=3, max_length=50)

    is_current: bool = Field(default=False)

    start_date: date
    end_date: Optional[date] = None

    description: Optional[str] = Field(None, min_length=3, max_length=500)


class EducationCreate:
    ...


class EducationUpdate(BaseModel, EducationValidator):
    degree_level: Optional[str] = Field(None, min_length=3, max_length=50)
    field_of_study: Optional[str] = Field(None, min_length=3, max_length=50)
    institution: Optional[str] = Field(None, min_length=3, max_length=50)
    start_date: Optional[date] = None
    description: Optional[str] = Field(None, min_length=3, max_length=500)

class EducationBaseResponseSchema(EducationBase):
    model_config = ConfigDict(from_attributes=True)
    id: int

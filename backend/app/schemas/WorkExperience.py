from datetime import date
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field, field_validator


class WorkExperienceValidator:
    @field_validator('end_date')
    @classmethod
    def check_dates(cls, end_date, info):
        start_date = info.data.get("start_date")

        if start_date and end_date and start_date > end_date:
                raise ValueError("End date can't be earlier than start date")

        return end_date

    @field_validator('position','company','location', 'description', mode="before")
    @classmethod
    def capitalize_name_fields(cls, v: str) -> str:
        if v is None:
            return v
        return v.strip().capitalize()


class WorkExperienceBase(BaseModel, WorkExperienceValidator):

    model_config = ConfigDict(from_attributes=True)

    position: str = Field(min_length=3, max_length=50)
    company: str = Field(min_length=3, max_length=50)
    location: Optional[str] = Field(default=None, min_length=3, max_length=50)

    start_date: date
    end_date = Optional[date]

    description: str = Field(min_length=3, max_length=500)


class WorkExperienceCreate(WorkExperienceBase):
    ...


class WorkExperienceUpdate(BaseModel, WorkExperienceValidator):

    model_config = ConfigDict(from_attributes=True)

    position: Optional[str] = Field(default=None, min_length=3, max_length=50)
    company: Optional[str] = Field(default=None, min_length=3, max_length=50)
    location: Optional[str] = Field(default=None, min_length=3, max_length=50)

    start_date: Optional[date]
    end_date: Optional[date]

    description: str = Field(min_length=3, max_length=500)


class WorkExperienceResponseSchema(WorkExperienceBase):
    model_config = ConfigDict(from_attributes=True)
    id: int

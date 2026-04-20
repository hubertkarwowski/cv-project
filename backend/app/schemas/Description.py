from typing import Optional
from pydantic import BaseModel, ConfigDict, Field, field_validator


class DescriptionValidator:
    @field_validator('description', mode="before")
    @classmethod
    def capitalize_descritpion_field(cls, v: str) -> str:
        if v is None:
            return v
        return v.strip().capitalize()


class DescriptionBase(BaseModel, DescriptionValidator):
    model_config = ConfigDict(from_attributes=True)

    description: str = Field(min_length=3, max_length=500)


class DescriptionCreate(DescriptionBase):
    ...


class DescriptionUpdate(BaseModel, DescriptionValidator):
    model_config = ConfigDict(from_attributes=True)

    description: Optional[str] = Field(default=None, min_length=3, max_length=500)


class DescriptionResponseSchema(DescriptionBase):
    model_config = ConfigDict(from_attributes=True)
    id: int

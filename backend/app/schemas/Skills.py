from typing import Optional
from pydantic import BaseModel, ConfigDict, Field, field_validator


class SkillsValidator:
    @field_validator('skills','languages','certyficates','courses', mode="before")
    @classmethod
    def capitalize_name_fields(cls, v: str) -> str:
        if v is None:
            return v
        return v.strip().capitalize()


class SkillsBase(BaseModel, SkillsValidator):
    model_config = ConfigDict(from_attributes=True)

    skills: str = Field(min_length=3, max_length=500)
    languages: str = Field(min_length=3, max_length=500)
    certyficates: Optional[str] = Field(min_length=3, max_length=500)
    courses: Optional[str] = Field(min_length=3, max_length=500)

class SkillsCreate(SkillsBase):
    ...


class SkillsUpdate(BaseModel, SkillsValidator):
    model_config = ConfigDict(from_attributes=True)

    skills: Optional[str] = Field(default=None ,min_length=3, max_length=500)
    languages: Optional[str] = Field(default=None ,min_length=3, max_length=500)
    certyficates: Optional[str] = Field(default=None ,min_length=3, max_length=500)
    courses: Optional[str] = Field(default=None ,min_length=3, max_length=500)


class SkillsBaseResponseSchema(SkillsBase):
    model_config = ConfigDict(from_attributes=True)
    id: int

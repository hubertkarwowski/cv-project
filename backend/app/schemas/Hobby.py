from typing import Optional
from pydantic import BaseModel, ConfigDict, Field, field_validator


class HobbyValidator:
    @field_validator('hobby', mode="before")
    @classmethod
    def capitalize_name_fields(cls, v: str) -> str:
        if v is None:
            return v
        return v.strip().capitalize()



class HobbyBase(BaseModel, HobbyValidator):
    model_config = ConfigDict(from_attributes=True)

    skills: str = Field(min_length=3, max_length=500)


class HobbyCreate(HobbyBase):
    ...


class HobbyUpdate(BaseModel, HobbyValidator):
    model_config = ConfigDict(from_attributes=True)

    hobby: Optional[str] = Field(default=None ,min_length=3, max_length=500)


class HobbyBaseResponseSchema(HobbyBase):
    model_config = ConfigDict(from_attributes=True)
    id: int

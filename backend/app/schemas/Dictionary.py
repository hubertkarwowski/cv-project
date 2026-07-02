from pydantic import BaseModel, ConfigDict, Field
from enum import Enum


class DictionaryCategory(str, Enum):
    LANGUAGE = "language"
    LANGUAGE_LEVEL = "language_level"
    SKILL_LEVEL = "skill_level"
    CONTRACT_TYPE = "contract_type"
    EDUCATION_LEVEL = "education_level"


class DictionaryBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    category: DictionaryCategory
    code: str = Field(min_length=1, max_length=50)
    label: str = Field(min_length=1, max_length=50)
    sort_order: int = Field(default=0, ge=0)


class DictionaryResponseSchema(DictionaryBase):
    model_config = ConfigDict(from_attributes=True)

    id: int

from datetime import date
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field

class EducationBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    degree_level: str = Field(..., min_length=3, max_length=50)
    field_of_study: str = Field(..., min_length=3, max_length=50)
    institution: str = Field(..., min_length=3, max_length=50)

    is_current: bool = Field(default=False)

    start_date: date
    end_date: Optional[date] = None

    description: Optional[str] = Field(None, min_length=3, max_length=500)

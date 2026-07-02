from app.schemas.Dictionary import DictionaryResponseSchema, DictionaryCategory
from typing_extensions import Annotated
from fastapi import APIRouter, Depends, HTTPException, Path
from app.db.db import get_db
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.dictionary import Dictionary

dictionaries = APIRouter(tags=["dictionaries"])


@dictionaries.get("/{category}", response_model=list[DictionaryResponseSchema])
def get_dictionary(
    category: Annotated[
        DictionaryCategory, Path(..., description="The dictionary category to list")
    ],
    db: Session = Depends(get_db),
):
    query = (
        select(Dictionary)
        .where(Dictionary.category == category)
        .order_by(Dictionary.sort_order, Dictionary.label)
    )
    items = db.scalars(query).all()

    if not items:
        raise HTTPException(
            status_code=404, detail=f"Dictionary {category.value} is empty"
        )
    return items

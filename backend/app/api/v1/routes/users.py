from typing_extensions import Annotated

from fastapi import APIRouter, Depends, HTTPException, Path
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.db.db import get_db
from app.models.user import User
from app.schemas.User import UserBase, UserResponseSchema

users = APIRouter(tags=["users"])


@users.get("/{user_id}", response_model=UserResponseSchema)
def get_user_data(
    user_id: Annotated[
        int, Path(..., gt=0, description="The ID of the user to retrieve")
    ],
    db: Session = Depends(get_db),
):
    user = db.get(User, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    return user


@users.post("/", response_model=UserResponseSchema)
def post_user_data(user: UserBase, db: Session = Depends(get_db)):
    payload = user.model_dump(mode="python")
    if payload.get("website_url") is not None:
        payload["website_url"] = str(payload["website_url"])
    db_user = User(**payload)
    try:
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=409, detail="Użytkownik o podanym emailu już istnieje"
        )

    return db_user

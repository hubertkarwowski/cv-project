from typing_extensions import Annotated

from fastapi import APIRouter, Depends, HTTPException, Path
from sqlalchemy.orm import Session

from app.db.db import get_db
from app.models.user import User
from app.schemas.User import UserBase, UserResponseSchema

users = APIRouter(tags=["users"])


@users.get("/{user_id}", response_model=UserResponseSchema)
def get_user_data(
    user_id: Annotated[int, Path(..., gt=0, description="The ID of the user to retrieve")],
    db: Session = Depends(get_db),
):
    user = db.get(User, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    return user

@users.post("/", response_model=UserBase)
def post_user_data(user: UserBase, db: Session = Depends(get_db)):
    db_user = User(**user.model_dump(mode="json")) 

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user
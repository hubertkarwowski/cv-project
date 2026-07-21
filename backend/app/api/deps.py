from typing_extensions import Annotated

from fastapi import Depends, HTTPException, Path
from sqlalchemy.orm import Session

from app.db.db import get_db
from app.models.user import User


def get_user_or_404(
    user_id: Annotated[
        int, Path(..., gt=0, description="The ID of the user to retrieve")
    ],
    db: Session = Depends(get_db),
) -> User:
    user = db.get(User, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


def get_user_with_avatar_or_404(
    user: Annotated[User, Depends(get_user_or_404)],
) -> User:
    if user.avatar_key is None:
        raise HTTPException(status_code=404, detail="Avatar not found")
    return user


CurrentUser = Annotated[User, Depends(get_user_or_404)]
UserWithAvatar = Annotated[User, Depends(get_user_with_avatar_or_404)]
DbSession = Annotated[Session, Depends(get_db)]

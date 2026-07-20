from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, Path
from sqlalchemy.orm import Session
from typing_extensions import Annotated

from app.db.db import get_db
from app.models.user import User
from uuid import uuid4
from app.services.storage import upload_fileobj, delete_object, generate_presigned_url

uploads = APIRouter(tags=["uploads"])

MAX_BYTES = 5 * 1024 * 1024  # 5 MB

ALLOWED_IMAGE_TYPES = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
}


@uploads.post("/image/{user_id}")
async def upload_avatar(
    user_id: Annotated[int, Path(..., gt=0)],
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
) -> dict[str, str]:
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    content_type = file.content_type

    if content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(status_code=415, detail="Unsupported file type")
    contents = await file.file.read(MAX_BYTES + 1)
    if len(contents) > MAX_BYTES:
        raise HTTPException(status_code=413, detail="File size is too large (max 5MB)")
    if not contents:
        raise HTTPException(status_code=400, detail="File is empty")

    extension = ALLOWED_IMAGE_TYPES[content_type]
    old_key = user.avatar_key
    new_key = f"users/{user_id}/avatar/{uuid4().hex}{extension}"
    await file.file.seek(0)
    upload_fileobj(file.file, new_key, content_type)
    user.avatar_key = new_key
    db.commit()
    if old_key:
        delete_object(old_key)
    return {"key": new_key}


@uploads.get("/avatar/{user_id}")
async def get_avatar(
    user_id: Annotated[int, Path(..., gt=0)], db: Session = Depends(get_db)
) -> dict[str, str]:
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.avatar_key is None:
        raise HTTPException(status_code=404, detail="Avatar not found")
    url = generate_presigned_url(user.avatar_key)
    return {"url": url}


@uploads.delete("/avatar/{user_id}")
async def delete_avatar(
    user_id: Annotated[int, Path(..., gt=0)], db: Session = Depends(get_db)
) -> None:
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.avatar_key is None:
        raise HTTPException(status_code=404, detail="Avatar not found")
    key = user.avatar_key
    user.avatar_key = None
    db.commit()
    delete_object(key)
    return None

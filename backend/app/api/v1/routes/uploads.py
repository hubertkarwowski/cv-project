from fastapi import APIRouter, UploadFile, File, HTTPException

from app.api.deps import CurrentUser, DbSession, UserWithAvatar
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
def upload_avatar(
    user: CurrentUser,
    db: DbSession,
    file: UploadFile = File(...),
) -> dict[str, str]:
    content_type = file.content_type

    if content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(status_code=415, detail="Unsupported file type")
    contents = file.file.read(MAX_BYTES + 1)
    if len(contents) > MAX_BYTES:
        raise HTTPException(status_code=413, detail="File size is too large (max 5MB)")
    if not contents:
        raise HTTPException(status_code=400, detail="File is empty")

    extension = ALLOWED_IMAGE_TYPES[content_type]
    old_key = user.avatar_key
    new_key = f"users/{user.id}/avatar/{uuid4().hex}{extension}"
    file.file.seek(0)
    upload_fileobj(file.file, new_key, content_type)
    user.avatar_key = new_key
    db.commit()
    if old_key:
        delete_object(old_key)
    return {"key": new_key}


@uploads.get("/avatar/{user_id}")
def get_avatar(user: UserWithAvatar) -> dict[str, str]:
    url = generate_presigned_url(user.avatar_key)
    return {"url": url}


@uploads.delete("/avatar/{user_id}")
def delete_avatar(user: UserWithAvatar, db: DbSession) -> None:
    key = user.avatar_key
    user.avatar_key = None
    db.commit()
    delete_object(key)
    return None

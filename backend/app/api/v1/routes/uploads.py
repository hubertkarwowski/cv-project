from fastapi import APIRouter, UploadFile, File, HTTPException

from app.api.deps import TargetUser, DbSession, TargetUserWithAvatar
from app.core.config import settings
from uuid import uuid4
from app.services.storage import upload_fileobj, delete_object, generate_presigned_url

uploads = APIRouter(tags=["uploads"])


@uploads.post("/avatar/{user_id}")
def upload_avatar(
    user: TargetUser,
    db: DbSession,
    file: UploadFile = File(...),
) -> dict[str, str]:
    content_type = file.content_type

    if content_type not in settings.ALLOWED_IMAGE_TYPES:
        raise HTTPException(status_code=415, detail="Unsupported file type")
    contents = file.file.read(settings.AVATAR_MAX_BYTES + 1)
    if len(contents) > settings.AVATAR_MAX_BYTES:
        max_mb = settings.AVATAR_MAX_BYTES // (1024 * 1024)
        raise HTTPException(
            status_code=413, detail=f"File size is too large (max {max_mb}MB)"
        )
    if not contents:
        raise HTTPException(status_code=400, detail="File is empty")

    extension = settings.ALLOWED_IMAGE_TYPES[content_type]
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
def get_avatar(user: TargetUserWithAvatar) -> dict[str, str]:
    url = generate_presigned_url(user.avatar_key)
    return {"url": url}


@uploads.delete("/avatar/{user_id}", status_code=204)
def delete_avatar(user: TargetUserWithAvatar, db: DbSession) -> None:
    key = user.avatar_key
    user.avatar_key = None
    db.commit()
    delete_object(key)

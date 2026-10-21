from fastapi import APIRouter
from app.api.v1.routes.users import users
from app.api.v1.routes.dictionaries import dictionaries
from app.api.v1.routes.uploads import uploads

router = APIRouter()
router.include_router(users, prefix="/users")
router.include_router(dictionaries, prefix="/dictionaries")
router.include_router(uploads, prefix="/uploads")

from fastapi import APIRouter
from app.api.v1.routes.users import users
from app.api.v1.routes.dictionaries import dictionaries

router = APIRouter()
router.include_router(users, prefix="/users")
router.include_router(dictionaries, prefix="/dictionaries")

from fastapi import APIRouter
from app.api.v1.routes.users import users

router = APIRouter()
router.include_router(users, prefix="/users")

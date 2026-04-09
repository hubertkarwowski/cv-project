from fastapi import FastAPI

from app.api.main import router as api_router
from app.core.config import settings

app = FastAPI(title=settings.app_name)
app.include_router(api_router, prefix=settings.API_V1_STR)

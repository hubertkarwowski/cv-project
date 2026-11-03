import traceback
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

import structlog
from fastapi import FastAPI, Request
from fastapi.exception_handlers import request_validation_exception_handler
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.main import router as api_router
from app.core.config import settings
from app.core.logging import setup_logging

logger = structlog.get_logger("app")


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:

    setup_logging()
    yield


app = FastAPI(title=settings.PROJECT_NAME, lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_HOST],
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(api_router, prefix=settings.API_V1_STR)


@app.exception_handler(ValueError)
async def value_error_handler(request: Request, exc: ValueError) -> JSONResponse:

    logger.error(
        "value_error",
        error_type=type(exc).__name__,
        method=request.method,
        path=request.url.path,
        exception="".join(traceback.format_tb(exc.__traceback__)),
    )
    return JSONResponse(status_code=422, content={"detail": str(exc)})


@app.exception_handler(RequestValidationError)
async def request_validation_error_handler(
    request: Request, exc: RequestValidationError
) -> JSONResponse:
    logger.warning(
        "request_validation_error",
        method=request.method,
        path=request.url.path,
        errors=[{"loc": e["loc"], "type": e["type"]} for e in exc.errors()],
    )
    return await request_validation_exception_handler(request, exc)

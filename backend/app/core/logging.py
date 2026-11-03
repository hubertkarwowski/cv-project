import logging
import sys

import structlog
from structlog.typing import Processor

from app.core.config import settings


def setup_logging() -> None:
    is_dev = settings.ENVIRONMENT == "dev"

    shared_processors: list[Processor] = [
        structlog.contextvars.merge_contextvars,
        structlog.stdlib.add_log_level,
        structlog.stdlib.add_logger_name,
        structlog.processors.TimeStamper(fmt="iso"),
    ]

    structlog.configure(
        processors=[
            structlog.stdlib.filter_by_level,
            *shared_processors,
            structlog.stdlib.ProcessorFormatter.wrap_for_formatter,
        ],
        logger_factory=structlog.stdlib.LoggerFactory(),
        wrapper_class=structlog.stdlib.BoundLogger,
        cache_logger_on_first_use=True,
    )

    final_processors: list[Processor] = (
        [
            structlog.dev.ConsoleRenderer(
                exception_formatter=structlog.dev.plain_traceback
            )
        ]
        if is_dev
        else [
            structlog.processors.format_exc_info,
            structlog.processors.JSONRenderer(),
        ]
    )

    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(
        structlog.stdlib.ProcessorFormatter(
            foreign_pre_chain=shared_processors,
            processors=[
                structlog.stdlib.ProcessorFormatter.remove_processors_meta,
                *final_processors,
            ],
        )
    )

    root = logging.getLogger()
    root.handlers = [handler]
    root.setLevel(logging.INFO)

    logging.getLogger("app").setLevel(logging.DEBUG if is_dev else logging.INFO)

    for name in ("uvicorn", "uvicorn.error", "uvicorn.access"):
        uvicorn_logger = logging.getLogger(name)
        uvicorn_logger.handlers.clear()
        uvicorn_logger.propagate = True

    logging.getLogger("sqlalchemy").setLevel(logging.WARNING)

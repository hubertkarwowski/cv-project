FROM python:3.13-alpine3.22

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-install-project

COPY . .
RUN uv sync --frozen

RUN addgroup -S app && adduser -S app -G app && chown -R app:app /app

USER app

CMD ["uv", "run", "fastapi", "dev", "--host", "0.0.0.0"]

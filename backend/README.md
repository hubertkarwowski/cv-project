# Backend FastAPI

## Created Architecture

A modular structure has been implemented within the `app/` directory:

- `api/` - support for routing and controllers.
- `core/` - project configuration and database connection.
- `db/` - project configuration and database connection.
- `schemas`- data definitions and validation.
- `models/`- data definitions and validation.
- `services/`- pure business logic.

# Tooling & Quality Gate

- **Black**: code formatting (PEP8).
- **Ruff**: linter for detecting logical errors and optimizing imports.
- **Mypy**: type hinting.
- **Pre-commit Hooks**: Automated linting and formatting.
- **Requirements Split**: Integration Black, Ruff and Mypy in commit process.

## Instruction Setup

From the repository root, run the setup script (requires [uv](https://docs.astral.sh/uv/)):

```sh
.\scripts\dev-setup.ps1   # Windows
./scripts/dev-setup.sh    # Linux, macOS, CI
```

Both scripts stop at the first error and are safe to run again. Without PowerShell or bash, run the same steps by hand from `backend/`:

1. Install dependencies: `uv sync`
2. Create the schema: `uv run alembic upgrade head`
3. Seed the dictionaries: `uv run python -m app.db.seed_dictionaries`

Then start the app with `uv run fastapi dev`.

Steps 2 and 3 need a running database. `.env` usually points at the Docker hostname (`POSTGRES_SERVER=db`), which only resolves inside Compose, so the script fails with `failed to resolve host 'db'` on the host. Either run these steps in the container:

```sh
docker compose up -d --build
docker compose exec backend uv run alembic upgrade head
docker compose exec backend uv run python -m app.db.seed_dictionaries
```

or start only the database and point the script at its published port. These variables override `.env` for the current terminal:

```powershell
docker compose up -d db
$env:POSTGRES_SERVER = 'localhost'; $env:POSTGRES_PORT = '5433'
.\scripts\dev-setup.ps1
```

```sh
docker compose up -d db
POSTGRES_SERVER=localhost POSTGRES_PORT=5433 ./scripts/dev-setup.sh
```

## Database Migrations

Alembic is the only source of truth for the schema; the app no longer creates tables on its own.

To change the schema, edit the model, then:

```sh
uv run alembic revision --autogenerate -m "describe the change"
uv run alembic upgrade head
```

Review the generated file before committing it. Autogenerate does not drop Postgres enum types in `downgrade()`, so add that by hand when a migration creates one.

### Existing dev databases

A database created before Alembic already has the tables, so a plain `alembic upgrade head` fails with `already exists`. Pick one:

- **No data to keep (default):** recreate the database, then run the setup again. `docker compose down -v` removes the volume with **all** local data.
- **Data to keep:** run `uv run alembic stamp head` instead of `upgrade head`. This only marks the database as migrated and changes no tables, so it is correct only if the schema already matches the models. Run `uv run alembic check` afterwards; it reports any difference.

## Checklist

- [x] modular file structure.
- [x] The Black, Ruff, and Mypy configurations have been added to `pyproject.toml`.
- [x] The `.gitignore` file correctly excludes the linter cache and the `venv` folder.
- [x] Pre-commit hooks tested locally.
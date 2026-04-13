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

1. Go to the backend folder: `cd backend`.
2. Run `uv sync`
3. Run `uv run fastapi dev`

## Checklist

- [x] modular file structure.
- [x] The Black, Ruff, and Mypy configurations have been added to `pyproject.toml`.
- [x] The `.gitignore` file correctly excludes the linter cache and the `venv` folder.
- [x] Pre-commit hooks tested locally.
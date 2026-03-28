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
2. Create and activate the venv: `python -m venv venv` and `source venv/Scripts/activate`.
3. Install the lib: `pip install -r requirements.txt`.
4. Install the development tools: `pip install -r requirements-dev.txt`.
5. Install automatic hooks: `pre-commit install`.

## Checklist

- [x] modular file structure.
- [x] The Black, Ruff, and Mypy configurations have been added to `pyproject.toml`.
- [x] The `.gitignore` file correctly excludes the linter cache and the `venv` folder.
- [x] Pre-commit hooks tested locally.

<!-- This is an auto-generated comment: release notes by coderabbit.ai -->

## Summary by CodeRabbit

- **New Features**
  - Added a FastAPI backend with a basic "Hello World" API endpoint.

- **Chores**
  - Initialized backend project with development tooling, linters and pre-commit hooks.
  - Added backend developer docs and dev dependency list.
  - Normalized frontend configuration and hook files line endings for consistency.
  <!-- end of auto-generated comment: release notes by coderabbit.ai -->

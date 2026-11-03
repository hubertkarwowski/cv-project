# cv-project

## Getting started

Create the backend configuration first. The app also requires the `R2_*` variables, which `backend/.env.example` does not list yet (see `backend/app/core/config.py`).

```sh
cp backend/.env.example backend/.env
```

There are two ways to run the project. Use `.\run.ps1` on Windows and `./run.sh` on Linux and macOS; both accept the same commands.

### Docker

Requires Docker with Compose. Builds the images, starts all services, then applies migrations and seeds the dictionaries in the `backend` container.

```sh
./run.sh docker
```

| Service  | URL                   |
| -------- | --------------------- |
| Frontend | http://localhost:5173 |
| Backend  | http://localhost:8000 |
| Adminer  | http://localhost:8080 |

A database created before Alembic was added stops this command with an `already exists` error. See [Existing dev databases](backend/README.md#existing-dev-databases).

### Local

Requires [uv](https://docs.astral.sh/uv/) and a reachable Postgres. Installs backend dependencies, applies migrations and seeds the dictionaries.

```sh
./run.sh setup
```

With `POSTGRES_SERVER=db` in `backend/.env`, this command needs the variables described in [Instruction Setup](backend/README.md#instruction-setup), because `db` only resolves inside Compose.

Then start the backend from `backend/` with `uv run fastapi dev`.

## Troubleshooting

If PowerShell refuses to run the script because of its execution policy, run it with:

```powershell
powershell -ExecutionPolicy Bypass -File .\run.ps1 docker
```

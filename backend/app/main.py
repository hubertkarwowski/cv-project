from fastapi import FastAPI, Path

from schemas.User import Gender, User

from typing import Annotated

app = FastAPI()


@app.get("/")
def read_root() -> dict[str, str]:
    return {"message": "Hello World"}


@app.get("/v1/user/{id}", response_model=User)
async def get_user_data(
    id: Annotated[int, Path(..., description="The ID of the user to retrieve")],
):
    return User(
        id=id,
        first_name="Jan",
        last_name="Kowalski",
        email="jan.kowalski@example.com",
        phone_number="+48123456789",
        date_of_birth="1990-05-15",
        gender=Gender.MALE,
        postal_code="50-001",
        city="Wroclaw",
        citizenship="Polish",
        website_url="https://jankowalski.dev",
    )

from typing_extensions import Annotated

from fastapi import APIRouter, Path

from app.schemas.User import Gender, UserResponseSchema

users = APIRouter(tags=["users"])


@users.get("/{user_id}", response_model=UserResponseSchema)
async def get_user_data(
    user_id: Annotated[int, Path(..., description="The ID of the user to retrieve")],
):
    return UserResponseSchema(
        id=user_id,
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

from fastapi import APIRouter

from backend.app.db.crud.user import create
from backend.app.schema.user import UserRegister


user_router = APIRouter(
    prefix="/user",
    tags=["user"],
    responses={404: {"description": "Not found"}},
)


@user_router.post("/register")
async def register_user(user: UserRegister):
    create(user.name, user.mail, user.password)
    return "User created."

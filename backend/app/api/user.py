from fastapi import APIRouter

from backend.app.db.crud.user import create, read
from backend.app.schema.user import UserRegister, UserLogin
from backend.app.util.hash import hash_string


user_router = APIRouter(
    prefix="/user",
    tags=["user"],
    responses={404: {"description": "Not found"}},
)


@user_router.post("/login")
async def login_user(user: UserLogin):
    user_data: list = read(user.name)

    print(user_data)

    hashed_password: str = hash_string(user.password)
    if hashed_password == user_data[0]:
        return True

    return False


@user_router.post("/register")
async def register_user(user: UserRegister):
    create(user.name, user.mail, user.password)
    return "User created."

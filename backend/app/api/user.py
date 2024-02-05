from fastapi import APIRouter

from backend.app.db.session import create_session, get_username_from_session
from backend.app.db.user import read_user, create_user, exists_user
from backend.app.schema.user import UserRegister, UserLogin, User
from backend.app.util.hash import hash_string


user_router = APIRouter(
    prefix="/user",
    tags=["user"],
    responses={404: {"description": "Not found"}}
)


@user_router.post("/username")
async def get_username(user: User):
    return get_username_from_session(user.token)


@user_router.post("/login")
async def login_user(user: UserLogin):
    if exists_user(user.name):
        user_data: list = read_user(user.name)[0]
        hashed_password: str = hash_string(user.password)
        if hashed_password == user_data[3].decode("utf-8"):
            return create_session(user.name)

    return False


@user_router.post("/register")
async def register_user(user: UserRegister):
    if exists_user(user.name):
        return False

    create_user(user.name, user.mail, user.password)
    return create_session(user.name)

from pydantic import BaseModel


class User(BaseModel):
    token: str


class UserLogin(BaseModel):
    name: str
    password: str


class UserRegister(BaseModel):
    name: str
    mail: str
    password: str

from pydantic import BaseModel


class UserRegister(BaseModel):
    name: str
    mail: str
    password: str

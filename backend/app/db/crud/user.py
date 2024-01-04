from backend.app.db.db import db
from backend.app.db.sql import sql
from backend.app.util.hash import hash_string


def create(name: str, mail: str, password: str):
    hash_password = hash_string(password)
    user = {
        "name": name,
        "mail": mail,
        "password": hash_password
    }

    query = sql.get_query("createUser.sql")
    db.execute(query, user)


def read():
    pass


def update():
    pass


def delete():
    pass

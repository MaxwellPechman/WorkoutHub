from backend.app.db.postgres.postgres import postgres
from backend.app.db.postgres.sql import sql
from backend.app.util.hash import hash_string


def exists_user(username: str) -> bool:
    query = sql.get_query("existsUser.sql")
    names = postgres.query(query)
    for name in names:
        if username == name[0].decode("utf-8"):
            return True

    return False


def create_user(name: str, mail: str, password: str):
    hash_password = hash_string(password)
    user = {
        "name": name,
        "mail": mail,
        "password": hash_password
    }

    query = sql.get_query("createAccount.sql")
    postgres.execute(query, user)


def read_user(name: str) -> list:
    schema = {"name": name}
    query = sql.get_query("readAccount.sql")
    return postgres.query(query, schema)


def read_user_by_id(account_id: int) -> list:
    schema = {"accountID": account_id}
    query = sql.get_query("readAccountById.sql")
    return postgres.query(query, schema)

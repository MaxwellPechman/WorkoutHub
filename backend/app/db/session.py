from datetime import datetime
from backend.app.db.mongo.mongo import mongodb
from backend.app.util.hash import hash_string


session_col = mongodb["session"]


def get_username_from_session(token: str) -> str:
    hashed_token = hash_string(token)
    session_data = session_col.find_one({"token": hashed_token})

    return session_data['username']


def create_session(username: str) -> str:
    date: str = datetime.utcnow().__str__()
    unhashed_token: str = session_col.estimated_document_count().__str__() + username + date
    hashed_token: str = hash_string(unhashed_token)
    data = {
        "username": username,
        "date_created": date,
        "token": hash_string(hashed_token)
    }

    session_col.insert_one(data)

    return hashed_token

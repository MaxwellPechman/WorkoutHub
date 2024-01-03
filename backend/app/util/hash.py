import hashlib


from backend.app.util.strings import is_empty


class InvalidString(Exception):
    pass


def hash_string(strg: str) -> str:
    if is_empty(strg):
        raise InvalidString()

    encoded_string = strg.encode('utf-8')
    hashed_string = hashlib.sha256(encoded_string)
    return hashed_string.hexdigest()

import hashlib


from backend.app.util.strings import is_empty


class InvalidString(Exception):
    pass


def hash_string(strings: str) -> str:
    if is_empty(strings):
        raise InvalidString()

    encoded_string = strings.encode('utf-8')
    hashed_string = hashlib.sha256(encoded_string)
    return hashed_string.hexdigest()

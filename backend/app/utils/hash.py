import hashlib


def hash_string(strings: str) -> str:
    encoded_string = strings.encode('utf-8')
    hashed_string = hashlib.sha256(encoded_string)
    return hashed_string.hexdigest()

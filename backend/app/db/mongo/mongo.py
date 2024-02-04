from typing import Mapping
from pymongo import MongoClient
from loguru import logger
from backend.app.config import load_mongo_connection_str
from backend.app.util.env import env
from backend.app.util.strings import is_empty


class MongoConnectionError(Exception):
    pass


def safe_connect_mongo(conn_str: str) -> MongoClient[Mapping[str, any]]:
    try:
        if is_empty(conn_str):
            raise MongoConnectionError("Connection string is empty.")

        return MongoClient(conn_str)

    except Exception as error:
        logger.exception("Error while connecting to MongoDB: " + error.__str__())


mongo = safe_connect_mongo(load_mongo_connection_str())
mongodb = mongo[env.get_env("MONGO_NAME")]

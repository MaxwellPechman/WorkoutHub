import psycopg

from loguru import logger
from psycopg import Connection

from backend.app.config import load_db_connection_str
from backend.app.db.sql import SQL


class DatabaseConnectionError(Exception):
    pass


class DatabaseExecuteError(Exception):
    pass


class DatabaseFetchError(Exception):
    pass


class DatabaseClient:
    def __init__(self, connection_string: str):
        self.connected: bool = False
        self.connection = self.__connect(connection_string)

    def __connect(self, connection_string: str):
        try:
            connection: Connection = psycopg.connect(connection_string)
            self.connected = True
            return connection

        except DatabaseConnectionError as exception:
            logger.error("Unable to connect to database: " + exception.__str__())

    def execute(self, query: SQL, params=None):
        if not self.connected:
            logger.error("Not connected to database.")
            raise DatabaseConnectionError()

        with self.connection.cursor() as cursor:
            try:
                if params is None:
                    cursor.execute(query.as_bytes())

                else:
                    cursor.execute(query.as_bytes(), params)

                self.connection.commit()

            except DatabaseExecuteError as exception:
                logger.error("Unable to execute query: " + exception.__str__())

    def dispose(self):
        if not self.connected:
            logger.error("Not connected to database.")
            raise DatabaseConnectionError(self.connected)

        self.connection.close()
        self.connected = False


db = DatabaseClient(load_db_connection_str())

import psycopg

from loguru import logger
from psycopg import Connection, Cursor
from psycopg.rows import Row

from backend.app.config import load_postgres_connection_str
from backend.app.util.strings import is_empty


class PostgresConnectionError(Exception):
    pass


class PostgresQueryError(Exception):
    pass


class PostgresClient:
    def __init__(self, connection_str: str):
        self.connection: Connection | None = None
        self.__connect(connection_str)

    def __connect(self, connection_str: str):
        try:
            if is_empty(connection_str):
                raise PostgresConnectionError("Connection string is empty.")

            if self.connection is not None:
                raise PostgresConnectionError("Already connected.")

            self.connection = psycopg.connect(connection_str)

        except Exception as error:
            logger.exception("Could not connect to Postgres database: " + error.__str__())

    def query(self, sql: str,
              params: dict | None = None,
              prepare: bool | None = None,
              binary: bool | None = None) -> list:
        try:
            if self.connection is None:
                raise PostgresConnectionError("Not connected to a Postgres database.")

            if is_empty(sql):
                raise PostgresQueryError("SQL statement is empty.")

            with self.execute(sql, params, prepare, binary) as cursor:
                fetched: Row | None = cursor.fetchall()
                if fetched is None:
                    raise PostgresQueryError("Record set is empty.")

                result: list = []
                for element in fetched:
                    result.append(element)

                return result

        except Exception as error:
            self.connection.close()
            logger.exception("Execute error: " + error.__str__())

    def execute(self, sql: str,
                params: dict | None = None,
                prepare: bool | None = None,
                binary: bool | None = None) -> Cursor:
        try:
            if self.connection is None:
                raise PostgresConnectionError("Not connected to a Postgres database.")

            if is_empty(sql):
                raise PostgresQueryError("SQL statement is empty.")

            cursor: Cursor = self.connection.cursor()
            sql_bytes: bytes = bytes(sql, 'utf-8')

            if params is None:
                cursor.execute(sql_bytes, prepare=prepare, binary=binary)

            else:
                if not isinstance(params, dict):
                    raise PostgresQueryError("SQL parameters must be a dict.")

                if len(params) == 0:
                    raise PostgresQueryError("Invalid SQL parameters.")

                cursor.execute(sql_bytes, params, prepare=prepare, binary=binary)

            self.connection.commit()
            return cursor

        except Exception as error:
            self.connection.close()
            logger.exception("Execute error: " + error.__str__())

    def dispose(self):
        try:
            if self.connection is None:
                raise PostgresConnectionError("Not connected to a Postgres database.")

            self.connection.close()

        except PostgresConnectionError as error:
            logger.exception("Unable to dispose connection: " + error.__str__())


postgres = PostgresClient(load_postgres_connection_str())

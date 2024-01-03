import os

from backend.app.util.files import read_dir_files, safe_find_file


SQL_DIR = "sql"


class QueryNotFound(Exception):
    pass


class SQL:
    def __init__(self, query: str):
        self.query = query

    def as_bytes(self, encoding: str = 'utf-8') -> bytes:
        return bytes(self.query, encoding)


class QueryManager:
    def __init__(self, directory: str):
        self.directory: str = directory
        self.queries: dict[str, SQL] = self.__load_queries()

    def __load_queries(self) -> dict[str, SQL]:
        loaded_queries: dict[str, str] = read_dir_files(self.directory)

        if loaded_queries == {}:
            raise QueryNotFound()

        queries: dict[str, SQL] = {}

        for key in loaded_queries:
            sql_query = SQL(loaded_queries[key])
            queries[key] = sql_query

        return queries

    def exists_query(self, query: str) -> bool:
        return query in self.queries

    def get_query(self, query: str) -> SQL:
        return self.queries[query]


sql = QueryManager(safe_find_file(os.pardir, SQL_DIR))

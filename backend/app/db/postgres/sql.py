import os

from backend.app.util.files import read_dir_files, safe_find_file


SQL_DIR = "sql"


class QueryNotFound(Exception):
    pass


class QueryManager:
    def __init__(self, directory: str):
        self.directory: str = directory
        self.queries: dict[str, str] = {}
        self.__load_queries()

    def __load_queries(self):
        self.queries = read_dir_files(self.directory)

    def exists_query(self, query: str) -> bool:
        return query in self.queries

    def get_query(self, query: str) -> str:
        return self.queries[query]


sql = QueryManager(safe_find_file(os.pardir, SQL_DIR))

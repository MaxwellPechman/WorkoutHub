import os

from dotenv import load_dotenv
from backend.app.utils.files import safe_find_file


ENV_FILE = ".env"


class EnvNotFound(Exception):
    pass


class EnvironmentManager:
    def __init__(self, file_path: str):
        self.loaded_dotenv: bool = False
        self.file_path: str = file_path
        self.envs: dict[str, str] = {}
        self.__load_envs()

    def __load_envs(self):
        if os.path.exists(self.file_path):
            self.loaded_dotenv = load_dotenv(self.file_path)

        loaded_envs = os.environ
        for envkey in loaded_envs:
            self.envs[envkey] = loaded_envs[envkey]

    def exists_env(self, env_name: str) -> bool:
        return env_name in self.envs

    def get_env(self, env_name: str) -> str:
        if self.exists_env(env_name):
            return self.envs[env_name]

        else:
            raise EnvNotFound()


env = EnvironmentManager(safe_find_file(os.pardir, ENV_FILE))

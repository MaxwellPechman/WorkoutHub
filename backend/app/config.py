import os

from backend.app.util.env import env
from backend.app.util.files import safe_find_file
from backend.app.util.net import is_valid_address, InvalidAddressFormat, is_valid_port, InvalidPortFormat
from backend.app.util.num import is_natural_number_str
from backend.app.util.yml import load_yaml, extract_yaml, extract_yaml_values


def load_host(env_name: str):
    host: str = env.get_env(env_name)

    if not is_valid_address(host):
        raise InvalidAddressFormat()

    return host


def load_port(env_name: str) -> int:
    port_str: str = env.get_env(env_name)

    if is_natural_number_str(port_str):
        port: int = int(port_str)

        if is_valid_port(port):
            return port

    raise InvalidPortFormat()


def load_db_connection_str(sslmode: str = "prefer", connection_timeout: int = 10) -> str:
    return ("host=" + load_host("DB_HOST") +
            " port=" + str(load_port("DB_PORT")) +
            " dbname=" + env.get_env("DB_NAME") +
            " user=" + env.get_env("DB_USER") +
            " password=" + env.get_env("DB_PASSWORD") +
            " sslmode=" + sslmode +
            " connect_timeout=" + str(connection_timeout))


def load_urls() -> list[str]:
    urls_path: str = safe_find_file(os.pardir, "urls.yml")
    urls_yaml_data: dict = load_yaml(urls_path)
    urls_yaml_extraced: dict[str, any] = extract_yaml(urls_yaml_data)
    return extract_yaml_values(urls_yaml_extraced)

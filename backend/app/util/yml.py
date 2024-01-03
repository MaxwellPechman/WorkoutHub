import os.path
import yaml


class YAMLFileNotFound(Exception):
    pass


class YAMLFormatInvalid(Exception):
    pass


def load_yaml(filepath: str) -> dict:
    if not os.path.exists(filepath):
        raise YAMLFileNotFound()

    with open(filepath) as file:
        yml = yaml.safe_load(file)

        if isinstance(yml, dict):
            return yml

        else:
            raise YAMLFormatInvalid()


def parse_duplicates(yml: dict[str, any], key: str, value: any) -> dict[str, any]:
    if key in yml:
        duplicate = yml[key]

        if isinstance(duplicate, list):
            duplicate.append(value)
            yml[key] = duplicate

        else:
            yml[key] = [duplicate, value]

    else:
        yml[key] = value

    return yml


def extract_yaml(yml: dict) -> dict[str, any]:
    extracted: dict[str, any] = {}

    for key in yml:
        value = yml[key]

        if isinstance(value, dict):
            subvalue = extract_yaml(value)

            for subkey in subvalue:
                extracted = parse_duplicates(extracted, subkey, subvalue[subkey])

        else:
            extracted = parse_duplicates(extracted, key, value)

    return extracted


def extract_yaml_values(yml: dict[str, any]) -> list[str]:
    urls: list[str] = []

    for key in yml:
        value = yml[key]

        if isinstance(value, list):
            for url in value:
                urls.append(url)

        else:
            urls.append(value)

    return urls

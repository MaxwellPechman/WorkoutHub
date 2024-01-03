import os.path


class FileNotDirectory(Exception):
    pass


class FileNotFound(Exception):
    pass


def read_dir_files(directory: str) -> dict[str, str]:
    if not os.path.isdir(directory):
        raise FileNotDirectory(directory)

    file_data: dict[str, str] = {}

    for file in os.listdir(directory):
        file_path = os.path.join(directory, file)

        if os.path.isfile(file_path):
            with open(file_path, 'r') as file_stream:
                file_data[file] = file_stream.read()

    return file_data


def safe_find_file(source_directory: str, target_file: str) -> str:
    if not os.path.isdir(source_directory):
        raise FileNotDirectory(source_directory)

    result_file: str | None = find_file(source_directory, target_file)
    if result_file is None:
        raise FileNotFound(result_file)

    return result_file


def find_file(source_directory: str, target_file: str) -> str | None:
    for file in os.listdir(source_directory):
        file_path = os.path.join(source_directory, file)

        if file == target_file:
            return os.path.abspath(file_path)

        if os.path.isdir(file_path):
            result_file: str | None = find_file(file_path, target_file)

            if result_file is not None:
                return result_file

    return None

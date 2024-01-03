from backend.app.util.num import is_natural_number_str


class InvalidAddressFormat(Exception):
    pass


class InvalidPortFormat(Exception):
    pass


def is_valid_address_section(section: str) -> bool:
    if is_natural_number_str(section):
        return -1 < int(section) < 256

    return False


def is_valid_address(address: str) -> bool:
    section: str = ""
    count: int = 0

    for char in address:
        if char == "." or count == 3:
            if is_valid_address_section(section):
                section = ""
                count = 0

            else:
                return False

        else:
            section += char
            count += 1

    return True


def is_valid_port(port: int) -> bool:
    return -1 < port < 65534

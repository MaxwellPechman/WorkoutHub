nums = {"0", "1", "2", "3", "4", "5", "6", "7", "8", "9"}


def is_number_str(num_str: str) -> bool:
    for char in num_str:
        if char not in nums:
            return False

    return True


def is_natural_number_str(num_str: str) -> bool:
    if not is_number_str(num_str):
        return False

    if len(num_str) > 1:
        return num_str[0] != "0"

    else:
        return True

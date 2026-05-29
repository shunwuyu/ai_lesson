def add(a: float, b: float) -> float:
    """
    Add two numbers and return the result.

    Args:
        a: First number to add
        b: Second number to add

    Returns:
        The sum of a and b

    Raises:
        TypeError: If a or b are not numbers

    Example:
        >>> add(2, 3)
        5
        >>> add(1.5, 2.5)
        4.0
    """
    # Check if inputs are numbers (int or float)
    if not isinstance(a, (int, float)):
        raise TypeError(f"'a' must be a number, got {type(a).__name__}")
    if not isinstance(b, (int, float)):
        raise TypeError(f"'b' must be a number, got {type(b).__name__}")

    return a + b


# Test cases
if __name__ == '__main__':
    # Normal cases
    print(add(2, 3))        # Output: 5
    print(add(1.5, 2.5))    # Output: 4.0

    # Error cases (will raise exceptions)
    try:
        add('2', 3)         # TypeError
    except TypeError as e:
        print(f"Error: {e}")

def calc_sum(n: int = 100) -> int:
    """计算 1 到 n 的累加和。"""
    return sum(range(1, n + 1))


if __name__ == "__main__":
    print(calc_sum(100))

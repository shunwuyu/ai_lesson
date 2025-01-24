def bubble_sort(arr):
    """
    冒泡排序函数
    参数: arr - 需要排序的列表
    返回: 排序后的列表
    """
    n = len(arr)
    # 外层循环控制排序轮数
    for i in range(n):
        # 内层循环控制每轮比较的次数
        for j in range(0, n - i - 1):
            # 如果前面的数大于后面的数，则交换位置
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                print(f"交换后的数组: {arr}")  # 打印每次交换后的状态
    return arr

# 测试代码
if __name__ == "__main__":
    # 测试数组
    test_list = [10, 20, 33, 21, 35, 11, 55]
    print("原始数组:", test_list)
    
    # 执行冒泡排序
    sorted_list = bubble_sort(test_list)
    print("\n最终排序结果:", sorted_list) 
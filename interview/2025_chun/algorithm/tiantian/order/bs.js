function advancedBubbleSort(arr) {
    const len = arr.length;
    // 记录最后一次交换的位置
    let lastSwapPos = len - 1;
    // 记录本轮需要比较到的位置
    let swapBorder = len - 1;
    
    for (let i = 0; i < len - 1; i++) {
        let swapped = false;
        lastSwapPos = 0; // 重置最后交换位置
        
        // 只需要比较到上一轮最后交换的位置
        for (let j = 0; j < swapBorder; j++) {
            if (arr[j] > arr[j + 1]) {
                // 交换元素
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
                // 记录这一轮最后交换的位置
                lastSwapPos = j;
            }
        }
        
        // 更新下一轮比较的边界为最后一次交换的位置
        swapBorder = lastSwapPos;
        
        // 如果没有发生交换，说明数组已经有序
        if (!swapped) {
            console.log(`数组已经有序，在第 ${i + 1} 轮提前终止`);
            break;
        }
        
        console.log(`第 ${i + 1} 轮后，下一轮比较边界缩小到索引 ${swapBorder}`);
    }
    return arr;
}
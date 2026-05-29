// 基础版冒泡排序
function basicBubbleSort(arr) {
    const len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                // 交换元素
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

// 优化版冒泡排序（提前终止）
function optimizedBubbleSort(arr) {
    const len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        let swapped = false; // 标记是否发生交换
        
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                // 交换元素
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        
        // 如果没有发生交换，说明数组已经有序，可以提前终止
        if (!swapped) {
            console.log(`数组已经有序，在第 ${i + 1} 轮提前终止`);
            break;
        }
    }
    return arr;
}

/**
 * 进一步优化的冒泡排序
 * 1. 使用 swapped 标志判断是否已经有序
 * 2. 记录最后一次交换的位置，下一轮只需要比较到这个位置
 * @param {number[]} arr - 需要排序的数组
 * @returns {number[]} - 排序后的数组
 */
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

// 测试用例：接近有序的数组
const almostSortedArray = [1, 2, 3, 4, 5, 7, 6, 8, 9, 10];
console.log('原始数组:', almostSortedArray);

// 复制数组进行测试
const arr1 = [...almostSortedArray];
const arr2 = [...almostSortedArray];
const arr3 = [...almostSortedArray];

console.log('\n使用基础冒泡排序:');
console.time('基础冒泡排序耗时');
console.log('排序结果:', basicBubbleSort(arr1));
console.timeEnd('基础冒泡排序耗时');

console.log('\n使用优化冒泡排序:');
console.time('优化冒泡排序耗时');
console.log('排序结果:', optimizedBubbleSort(arr2));
console.timeEnd('优化冒泡排序耗时');

console.log('\n使用进一步优化的冒泡排序:');
console.time('进一步优化的冒泡排序耗时');
console.log('排序结果:', advancedBubbleSort(arr3));
console.timeEnd('进一步优化的冒泡排序耗时');

// 完全有序的数组测试（最好情况 O(n)）
const sortedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log('\n测试完全有序的数组:');
console.time('进一步优化的冒泡排序(有序数组)耗时');
advancedBubbleSort([...sortedArray]);
console.timeEnd('进一步优化的冒泡排序(有序数组)耗时'); 
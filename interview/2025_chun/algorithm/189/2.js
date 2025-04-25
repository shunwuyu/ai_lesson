function rotate(nums, k) {
    const n = nums.length;
    k = k % n;
    const temp = [...nums];
    
    for (let i = 0; i < n; i++) {
        nums[(i + k) % n] = temp[i];
    }
}

时间复杂度: O(n)
空间复杂度: O(n)
function compareVersion(version1, version2) {
    const v1Parts = version1.split('.').map(Number);
    const v2Parts = version2.split('.').map(Number);
    
    const maxLength = Math.max(v1Parts.length, v2Parts.length);
    
    for (let i = 0; i < maxLength; i++) {
        const v1 = v1Parts[i] || 0; // 如果没有该部分，视为0
        const v2 = v2Parts[i] || 0; // 如果没有该部分，视为0
        
        if (v1 > v2) return 1; // version1 大于 version2
        if (v1 < v2) return -1; // version1 小于 version2
    }
    
    return 0; // 两个版本号相等
}

// 示例
console.log(compareVersion("1.0.1", "1.0.0")); // 输出: 1
console.log(compareVersion("1.0", "1.0.0"));   // 输出: 0
console.log(compareVersion("1.0.0", "1.0.1")); // 输出: -1
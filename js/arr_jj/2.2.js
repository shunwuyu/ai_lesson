const names = ["Alice", "Bob", "Charlie", "David"];

names.forEach(function(name) {
    if (name === "Charlie") {
        console.log("Found Charlie, trying to break...");
        // ❌ break 是语法错误，不能在 forEach 中使用
        // break;
    }
    console.log("Processing: " + name);
});
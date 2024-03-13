const rootNode = {
    value:1,
    children: [
        {
            value: 2,
            children: [
                {
                    value: 3,
                    children:[]
                },
                {
                    value: 4,
                    children: []
                }
            ]
        },
        {
            value: 5,
            children: []
        }
    ]
}

function dfs(node) {
    // 访问当前节点
    console.log(node.value);

    // 遍历子节点
    for (let child of node.children) {
        dfs(child);
    }
}

console.log(dfs(rootNode));
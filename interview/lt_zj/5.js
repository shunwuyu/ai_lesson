const bfs = (root) => {
    const queue = [root];
    
    while (queue.length > 0) {
        const currentNode = queue.shift();
        console.log(currentNode.value);

        if (currentNode.children) {
            currentNode.children.forEach(child => {
                queue.push(child);
            });
        }
    }
};

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
// 12534
console.log(bfs(rootNode))
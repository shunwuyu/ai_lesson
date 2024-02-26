function listToTree(list) {
    let root = {}; // 初始化根节点
    
    function findNodeInChildren(nodeList, parentId) {
        for (let i = 0; i < nodeList.length; i++) {
            if (nodeList[i].parent_id === parentId) {
                return nodeList[i];
            }
        }
        
        return null;
    }
    
    function buildTree(nodeList, parentId) {
        let children = [];
        
        for (let i = 0; i < nodeList.length; i++) {
            const currentNode = nodeList[i];
            
            if (currentNode.parent_id === parentId) {
                const childNode = buildTree(nodeList, currentNode.id);
                
                if (childNode !== null) {
                    currentNode.children = [childNode];
                } else {
                    delete currentNode.children;
                }
                
                children.push(currentNode);
            }
        }
        
        return children.length > 0 ? children : null;
    }
    
    root.children = buildTree(list, -1);
    
    return root;
}

const list = [{ id: 1, name: 'A', parent_id: -1 },
              { id: 2, name: 'B', parent_id: 1 },
              { id: 3, name: 'C', parent_id: 1 },
              { id: 4, name: 'D', parent_id: 2 },
              { id: 5, name: 'E', parent_id: 2 },
              { id: 6, name: 'F', parent_id: 3 }];
              
console.log(listToTree(list));
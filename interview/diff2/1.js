const oldChildren = n1.children
const newChildren = n2.children

let lastIndex = 0
// 新的结点
for (let i = 0; i < newChildren.length; i++) {
    const newVNode = newChildren[i];
    let j = 0;
    let find = false;
    for (j; j < oldChildren.length; j++) {
        const oldVNode = oldChildren[j]
        if (newVNode.key === oldVNode.key) {
            find=true
            patch(oldVNode, newVNode, container)
            break; //跳出循环， 处理下一个节点 
        }
    }

    if (!find) {
        const prevVnode = newChildren[i-1]
        let anchor = null
        if (prevVNode) {
            anchor = prevVNode.el.nextSibling
        } else {
            anchor = container.firstChild
        }
        path(null, newVNode, container, anchor)
    }
}
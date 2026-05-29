const oldChildren = n1.children;
const newChildren = n2.children;

let oldStartIdx = 0;
let oldEndIdx = oldChildren.length - 1;
let newStartIdx = 0;
let newEndIdx = newChildren.length - 1;

let oldStartVNode = oldChildren[oldStartIdx];
let oldEndVNode = oldChildren[oldEndIdx];
let newStartVNode = newChildren[newStartIdx];
let newEndVNode = newChildren[newEndIdx];

// 主循环：遍历旧的和新的子节点列表
while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVNode) {
        // 比较旧的开始节点和新的开始节点
        if (oldStartVNode.key === newStartVNode.key) {
            patch(oldStartVNode, newStartVNode, container);
            oldStartVNode = oldChildren[++oldStartIdx];
            newStartVNode = newChildren[++newStartIdx];
        } else if (oldEndVNode.key === newStartVNode.key) {
            // 移动旧的结束节点到新的开始节点的位置
            patch(oldEndVNode, newStartVNode, container);
            insert(oldEndVNode.el, container, oldStartVNode.el);
            oldEndVNode = oldChildren[--oldEndIdx];
            newStartVNode = newChildren[++newStartIdx];
        } else {
            // 遍历旧的 children，试图寻找与 newStartVNode 拥有相同 key 值的元素
            const idxInOld = oldChildren.findIndex(node => node.key === newStartVNode.key);
            if (idxInOld > 0) {
                const vnodeToMove = oldChildren[idxInOld];
                patch(vnodeToMove, newStartVNode, container);
                insert(vnodeToMove.el, container, oldStartVNode.el);
                oldChildren[idxInOld] = undefined; // 标记为已处理
            } else {
                patch(null, newStartVNode, container, oldStartVNode.el);
            }
            newStartVNode = newChildren[++newStartIdx];
        }
    } else if (oldEndVNode) {
        // 比较旧的结束节点和新的结束节点
        if (oldEndVNode.key === newEndVNode.key) {
            patch(oldEndVNode, newEndVNode, container);
            oldEndVNode = oldChildren[--oldEndIdx];
            newEndVNode = newChildren[--newEndIdx];
        } else if (oldEndVNode.key === newStartVNode.key) {
            // 移动旧的结束节点到新的开始节点的位置
            patch(oldEndVNode, newStartVNode, container);
            insert(oldEndVNode.el, container, oldStartVNode.el);
            oldEndVNode = oldChildren[--oldEndIdx];
            newStartVNode = newChildren[++newStartIdx];
        } else {
            // 遍历旧的 children，试图寻找与 newEndVNode 拥有相同 key 值的元素
            const idxInOld = oldChildren.findIndex(node => node.key === newEndVNode.key);
            if (idxInOld > 0) {
                const vnodeToMove = oldChildren[idxInOld];
                patch(vnodeToMove, newEndVNode, container);
                insert(vnodeToMove.el, container, oldEndVNode.el);
                oldChildren[idxInOld] = undefined; // 标记为已处理
            } else {
                patch(null, newEndVNode, container, oldEndVNode.el);
            }
            newEndVNode = newChildren[--newEndIdx];
        }
    }
}

// 处理剩余的新节点
if (oldEndIdx < oldStartIdx && newStartIdx <= newEndIdx) {
    for (let i = newStartIdx; i <= newEndIdx; i++) {
        patch(null, newChildren[i], container, oldStartVNode.el);
    }
} else if (newEndIdx < newStartIdx && oldStartIdx <= oldEndIdx) {
    // 处理剩余的旧节点
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
        unmount(oldChildren[i]);
    }
}
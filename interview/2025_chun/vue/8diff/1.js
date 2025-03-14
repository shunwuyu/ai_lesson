const oldChildren = n1.children;
const newChildren = n2.children;

let lastIndex = 0;

// 遍历新的 children
for (let i = 0; i < newChildren.length; i++) {
    const newVNode = newChildren[i];
    let j = 0;
    let find = false;

    // 遍历旧的 children
    for (; j < oldChildren.length; j++) {
        const oldVNode = oldChildren[j];

        // 如果找到了具有相同 key 值的两个节点，则调用 patch 函数更新
        if (newVNode.key === oldVNode.key) {
            find = true;
            patch(oldVNode, newVNode, container);

            if (j < lastIndex) {
                // 需要移动
                const prevVNode = newChildren[i - 1];
                if (prevVNode) {
                    const anchor = prevVNode.el.nextSibling;
                    insert(newVNode.el, container, anchor);
                }
            } else {
                // 更新 lastIndex
                lastIndex = j;
            }

            break;
        }
    }

    if (!find) {
        const prevVNode = newChildren[i - 1];
        let anchor = null;
        if (prevVNode) {
            anchor = prevVNode.el.nextSibling;
        } else {
            anchor = container.firstChild;
        }
        patch(null, newVNode, container, anchor);
    }
}

// 遍历旧的节点
for (let i = 0; i < oldChildren.length; i++) {
    const oldVNode = oldChildren[i];

    // 拿着旧 VNode 去新 children 中寻找相同的节点
    const has = newChildren.find(
        vnode => vnode.key === oldVNode.key
    );

    if (!has) {
        // 如果没有找到相同的节点，则移除
        unmount(oldVNode);
    }
}
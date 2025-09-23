const oldTree = {
  type: 'div',
  props: { id: 'root' },
  children: [
    { type: 'h1', props: { key: 'title' }, children: ['Hello'] },
    { type: 'p', props: { key: 'desc' }, children: ['Old Text'] },
  ]
};

const newTree = {
  type: 'div',
  props: { id: 'root' },
  children: [
    { type: 'h1', props: { key: 'title' }, children: ['Hello World'] },
    { type: 'span', props: { key: 'extra' }, children: ['New Node'] }
  ]
};

// 更新 h1 的文本 → “Hello World”
// 删除 p
// 插入 span

// “diff 算法就是 递归比较：
// 如果节点类型不一样，直接替换整棵子树。
// 如果类型一样，继续比较属性、然后比较 children。
// children 列表用 key 提升性能：
// 相同 key → 复用并递归 diff。
// 旧有新无 → 删除。
// 新有旧无 → 插入。”

// 这就是 React/Vue 的核心思想，只不过真实实现更复杂（比如最小移动）。

// 下面给出一个可运行的简化实现：

// 只支持 type、props、children。

// children 是数组，可以是字符串（文本）或节点对象。

// 使用 key 快速定位。

function diff(oldNode, newNode, patches = []) {
  // 1. 类型不同 → 替换整个节点
  if (!newNode) {
    patches.push({ type: 'REMOVE', oldNode });
  } else if (!oldNode || oldNode.type !== newNode.type) {
    patches.push({ type: 'REPLACE', oldNode, newNode });
  } else if (typeof oldNode === 'string' && typeof newNode === 'string') {
    // 2. 文本节点
    if (oldNode !== newNode) {
      patches.push({ type: 'TEXT', oldText: oldNode, newText: newNode });
    }
  } else {
    // 3. 属性更新
    const propPatches = [];
    const allProps = { ...oldNode.props, ...newNode.props };
    for (const key in allProps) {
      if (oldNode.props[key] !== newNode.props[key]) {
        propPatches.push({ key, value: newNode.props[key] });
      }
    }
    if (propPatches.length) {
      patches.push({ type: 'PROPS', node: oldNode, props: propPatches });
    }

    // 4. children diff (keyed)
    const oldChildren = oldNode.children || [];
    const newChildren = newNode.children || [];
    const max = Math.max(oldChildren.length, newChildren.length);

    // 建一个 key -> index 映射方便查找
    const oldKeyMap = {};
    oldChildren.forEach((child, i) => {
      if (child.props && child.props.key) {
        oldKeyMap[child.props.key] = i;
      }
    });

    for (let i = 0; i < newChildren.length; i++) {
      const newChild = newChildren[i];
      let oldChild = oldChildren[i];

      // 如果有 key，尝试复用
      const key = newChild.props && newChild.props.key;
      if (key != null && oldKeyMap[key] != null) {
        oldChild = oldChildren[oldKeyMap[key]];
      }
      diff(oldChild, newChild, patches);
    }

    // 删除多余的旧节点
    if (oldChildren.length > newChildren.length) {
      for (let i = newChildren.length; i < oldChildren.length; i++) {
        patches.push({ type: 'REMOVE', oldNode: oldChildren[i] });
      }
    }
  }
  return patches;
}

// 使用示例
const patches = diff(oldTree, newTree);
console.log(patches);

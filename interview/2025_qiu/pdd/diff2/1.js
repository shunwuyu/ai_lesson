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

/**
 * 虚拟 DOM 差异对比（diff）算法
 * 比较新旧虚拟节点，生成操作补丁（patches），用于后续更新真实 DOM
 * 
 * @param {Object|string} oldNode - 旧的虚拟节点
 * @param {Object|string} newNode - 新的虚拟节点
 * @param {Array} patches - 累积的操作补丁列表（默认空数组）
 * @returns {Array} 所有需要应用的操作补丁
 */
function diff(oldNode, newNode, patches = []) {
  // 1. 节点被移除：如果新节点不存在，标记为删除
  if (!newNode) {
    patches.push({ type: 'REMOVE', oldNode });
  }
  // 2. 节点类型不同或旧节点不存在 → 需要替换整个节点
  //    类型不同包括：div → span，文本 → 元素等
  else if (!oldNode || oldNode.type !== newNode.type) {
    patches.push({ type: 'REPLACE', oldNode, newNode });
  }
  // 3. 都是文本节点：比较文本内容是否变化
  else if (typeof oldNode === 'string' && typeof newNode === 'string') {
    if (oldNode !== newNode) {
      patches.push({ type: 'TEXT', oldText: oldNode, newText: newNode });
    }
  }
  // 4. 节点类型相同，进行深度比较（属性、子节点）
  else {
    // 属性更新：收集所有属性变化
    const propPatches = [];
    // 合并新旧所有属性名，确保新增、删除、修改都能被检测
    const allProps = { ...oldNode.props, ...newNode.props };
    for (const key in allProps) {
      if (oldNode.props[key] !== newNode.props[key]) {
        propPatches.push({ key, value: newNode.props[key] });
      }
    }
    // 如果有属性变化，记录到补丁中
    if (propPatches.length) {
      patches.push({ type: 'PROPS', node: oldNode, props: propPatches });
    }

    // 子节点 diff（使用 key 优化复用）
    const oldChildren = oldNode.children || [];
    const newChildren = newNode.children || [];
    const max = Math.max(oldChildren.length, newChildren.length);

    // 构建旧子节点的 key 映射表：key → 索引
    // 用于根据 key 快速查找可复用的节点
    const oldKeyMap = {};
    oldChildren.forEach((child, i) => {
      if (child.props && child.props.key) {
        oldKeyMap[child.props.key] = i;
      }
    });

    // 遍历新子节点，递归 diff 每个子节点
    for (let i = 0; i < newChildren.length; i++) {
      const newChild = newChildren[i];
      let oldChild = oldChildren[i]; // 默认按索引匹配

      // 如果新节点有 key，尝试从旧节点中找对应 key 的节点复用
      const key = newChild.props && newChild.props.key;
      if (key != null && oldKeyMap[key] != null) {
        oldChild = oldChildren[oldKeyMap[key]]; // 找到可复用的旧节点
      }
      // 递归比较新旧子节点，补丁累积到外层 patches
      diff(oldChild, newChild, patches);
    }

    // 处理被删除的子节点：如果旧节点比新节点多，剩余的旧节点需要被删除
    if (oldChildren.length > newChildren.length) {
      for (let i = newChildren.length; i < oldChildren.length; i++) {
        patches.push({ type: 'REMOVE', oldNode: oldChildren[i] });
      }
    }
  }

  // 返回所有生成的补丁
  return patches;
}

// 使用示例
const patches = diff(oldTree, newTree);
console.log(patches);

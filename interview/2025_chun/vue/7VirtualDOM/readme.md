# 虚拟DOM是什么？

Vue 3的虚拟DOM是真实DOM在内存中的轻量级副本，用于高效更新UI。它通过对比新旧虚拟DOM差异，仅渲染变化的部分，提升性能并优化用户体验。

- 请写出一下DOM片段的虚拟DOM
  <div id="todo-list">
  <input placeholder="Add new todo" />
  <ul>
    <li class="todo-item">Buy groceries</li>
    <li class="todo-item">Read a book</li>
  </ul>
  </div>

  ```
  const vnode = {
  type: 'div',
  props: { id: 'todo-list' },
  children: [
    { 
      type: 'input', 
      props: { placeholder: 'Add new todo' } 
    },
    { 
      type: 'ul', 
      children: [
        { type: 'li', props: { class: 'todo-item' }, children: ['Buy groceries'] },
        { type: 'li', props: { class: 'todo-item' }, children: ['Read a book'] }
      ] 
    }
  ]
};
  ```

- 三个参数意义
  在虚拟DOM中，type定义元素类型，如'div'；props包含属性，如'id'或'class'；children表示嵌套的子元素或文本内容。它们共同描述UI结构。

- 虚拟DOM通过对比新旧虚拟DOM树的差异，仅更新变化的部分到真实DOM，减少了直接操作DOM的次数，从而大幅提升性能和渲染效率。
  假设有一个包含100项的列表，仅第50项更新了文本。使用虚拟DOM时，系统只会重新渲染并更新第50项的实际DOM节点，而不是整个列表。这显著减少了直接操作DOM的次数，提高了性能。

  无虚拟DOM: 重绘整个列表。
  有虚拟DOM: 仅更新<li>Item 50</li>，减少不必要的DOM操作。新旧虚拟DOM 的比对

- vue 3 虚拟DOM
  v3-virtual-dom
  react-virtual-dom

- 新旧虚拟DOM的比对
  ```
  const oldVNode = React.createElement(
  'div',
  { id: 'todo-list' },
  React.createElement('input', { placeholder: 'Add new todo' }),
  React.createElement('ul', null,
    React.createElement('li', { key: '1', className: 'todo-item' }, 'Buy groceries'),
    React.createElement('li', { key: '2', className: 'todo-item' }, 'Read a book')
  )
);
  ```

  ```js
  <div id="todo-list">
  <input placeholder="Add new todo">
  <ul>
    <li class="todo-item">Buy groceries</li>
    <li class="todo-item">Read a book</li>
  </ul>
</div>
  ```
  ```js
  const newVNode = React.createElement(
  'div',
  { id: 'todo-list' },
  React.createElement('input', { placeholder: 'Add new todo' }),
  React.createElement('ul', null,
    React.createElement('li', { key: '1', className: 'todo-item' }, 'Buy fruits'), // 更新了第一个任务
    React.createElement('li', { key: '2', className: 'todo-item' }, 'Read a book'),
    React.createElement('li', { key: '3', className: 'todo-item' }, 'Go for a walk') // 添加了新的任务
  )
);
  ```
  ```
  <div id="todo-list">
  <input placeholder="Add new todo">
  <ul>
    <li class="todo-item">Buy fruits</li> <!-- 更新了 -->
    <li class="todo-item">Read a book</li>
    <li class="todo-item">Go for a walk</li> <!-- 新增了 -->
  </ul>
</div>
  ```

  React会对比这两棵树，找出需要更新的部分：
  第一个<li>（key为1）的内容从“Buy groceries”变更为“Buy fruits”
  新增节点： 新增了一个<li>（key为3），内容为“Go for a walk”。React会将这个新的节点插入到DOM中。




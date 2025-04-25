[](https://pomb.us/build-your-own-react/)

- Step I: The createElement Function
- Step II: The render Function 
- Step III: Concurrent Mode 并发模式
- Step IV: Fibers

- Step V: Render and Commit Phases 渲染阶段 提交阶段
- Step VI: Reconciliation 协调
- Step VII: Function Components 函数组件
- Step VIII: Hooks 钩子函数

## fiber

- We’ll have one fiber for each element and each fiber will be a unit of work.
- 可中断的、增量式的渲染流程
    - the root fiber 
    - The rest of the work will happen on the performUnitOfWork function
    - add the element to the DOM
    - create the fibers for the element’s children
    - select the next unit of work

    
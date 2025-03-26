# JavaScript 事件机制简述
    
    JavaScript 事件机制包含三个阶段：捕获、目标和冒泡。捕获阶段从顶层元素向下传播到目标元素；目标阶段在事件到达目标元素时触发；冒泡阶段从目标元素向上传播到顶层元素。通过 addEventListener 的第三个参数可控制在捕获阶段（true）或冒泡阶段（false，默认）处理事件。某些事件如 focus、mouseenter 等不会冒泡，只在目标元素上触发。事件对象的 stopPropagation() 方法可阻止事件继续传播。

    不会冒泡的事件仍有捕获阶段，但没有冒泡阶段。它们的事件流只包含捕获阶段和目标阶段。

    ![](https://javascript.info/article/bubbling-and-capturing/eventflow.svg)


# 不会冒泡的事件有哪些

1. focus/blur - 焦点事件
2. load/unload - 资源加载事件
3. mouseenter/mouseleave - 鼠标进入/离开事件
4. resize - 窗口大小改变事件
5. scroll - 滚动事件
6. play/pause - 媒体播放暂停事件

useCapture: true 1.html
这些事件只会在绑定它们的元素上触发,不会向上传播到父元素。如果需要在父元素上监听这些事件,可以:

1. 直接在目标元素上绑定事件处理程序
2. 使用事件捕获阶段(addEventListener的第三个参数设为true)
3. 对于focus/blur,可以使用focusin/focusout代替,这两个事件会冒泡 
4. 对于mouseenter/mouseleave,可以使用mouseover/mouseout代替,这两个事件会冒泡 2.html


- 事件委托 
// 事件委托示例
document.getElementById("parent-list").addEventListener("click", function(event) {
  // 检查是否点击了列表项
  if (event.target.tagName === "LI") {
    console.log("点击了列表项:", event.target.textContent);
    // 对列表项执行操作
  }
});

- 面试官为什么要这么问？

1. 对DOM事件机制的深入理解程度
2. 实际开发中可能遇到的事件传播问题的解决能力
3. 使用事件委托模式时的边界情况意识
4. 对常见事件行为特性的熟悉程度
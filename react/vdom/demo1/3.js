// 最终生成的 虚拟 DOM（VDOM）对象结构
// JSX → 编译 → React.createElement() → 执行 → 生成 VDOM 对象 → React 用它来高效更新真实 DOM
{
    type: "div",
    props: {
      className: "user-card",
      style: {
        border: "2px solid green"  // 假设 user.isActive 为 true
      },
      children: [
        {
          type: "h2",
          props: {
            children: ["用户：", "张三"]
          }
        },
        {
          type: "p",
          props: {
            children: ["年龄：", 25]
          }
        },
        {
          type: "span",
          props: {
            className: "status",
            children: ["在线"]
          }
        }
      ]
    }
  }
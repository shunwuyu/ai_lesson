// 这段 JSX 实际上会被编译成什么？
const userCard = React.createElement(
    "div",
    {
      className: "user-card",
      style: {
        border: user.isActive ? "2px solid green" : "2px solid gray"
      }
    },
    React.createElement("h2", null, "用户：", user.name),
    React.createElement("p", null, "年龄：", user.age),
    user.isActive &&
      React.createElement("span", { className: "status" }, "在线")
  );
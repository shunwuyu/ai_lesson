const user = {
    name: "张三",
    age: 25,
    isActive: true
};
// 一个用户信息卡片
const userCard = (
<div className="user-card" style={{ border: user.isActive ? "2px solid green" : "2px solid gray" }}>
    <h2>用户：{user.name}</h2>
    <p>年龄：{user.age}</p>
    {user.isActive && <span className="status">在线</span>}
</div>
);
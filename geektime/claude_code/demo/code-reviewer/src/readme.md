# SQL 注入

- 先看这段代码在“干嘛”
async findUser(username) {
  const query = `SELECT * FROM users WHERE username = '${username}'`;
  return this.execute(query);
}
你本意是：
👉 根据用户名查用户
比如用户正常输入：
username = "tom"
最终 SQL 语句是：
SELECT * FROM users WHERE username = 'tom';
👍 一切正常。

二、问题的核心：SQL 是「字符串 + 指令」混在一起的
数据库并不知道哪部分是“数据”，哪部分是“命令”
它只会把你拼出来的 SQL 当成完整指令执行。
也就是说：
用户输入的内容，有可能变成 SQL 命令的一部分
这就是 SQL 注入 的根本原因。

三、真实攻击案例（非常经典）
攻击者这样输入 username：
' OR 1=1 --
你的代码拼出来的 SQL 变成了：
SELECT * FROM users WHERE username = '' OR 1=1 --';
我们拆开看 👇

username = ''      // 永远不成立
OR 1=1             // 永远成立
--                 // 注释后面的内容
等价于：

SELECT * FROM users;

四、这有多危险？（小白必懂版）

如果这是：

🔐 登录接口

攻击者 无需密码

可以直接登录第一个用户（通常是管理员）

📦 用户查询接口

能看到所有用户数据

包括邮箱、手机号、甚至密码 hash

更严重的情况
'; DROP TABLE users; --
SELECT * FROM users WHERE username = ''; DROP TABLE users; --';

五、一句话总结为什么会 SQL 注入

❌ 你把“用户输入”当成了“SQL 代码的一部分”

六、正确做法：让「数据」和「命令」彻底分离

方案一（最重要）：参数化查询（Prepared Statement）

const query = 'SELECT * FROM users WHERE username = ?';
return this.execute(query, [username]);

原理（小白友好版）

? 是一个占位符

数据库提前“编译” SQL 结构

用户输入 只会当成普通字符串

就算输入 OR 1=1 也只是“文本”

数据库理解为：

“我要找用户名叫
' OR 1=1 --
的用户”

而不是执行命令。

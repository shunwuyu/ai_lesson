# checkpointer  恢复执行

之前我们设计Agent都是用langgraph 是一个基于状态机的图，用于定义和执行复杂的流程。
如果在执行过程中，Agent 发生了错误或需要暂停等待用户确认（授权），我们可以使用 checkpointer 来恢复执行。
checkpointer 是一个用于保存和恢复 Agent 执行状态的工具。

以企业报销审批 Agent 为例：
场景流程
员工提交了 5 万元的差旅报销，Agent 自动核验发票、行程单都合规，但超过 2 万需要主管授权才能打款：
自动核验 → Agent 查发票真伪、比对出差申请，全部通过
暂停等授权 → interrupt() 挂起，把报销单信息存进 SQLite
主管审批 → 主管收到邮件通知，第二天出差路上点开"批准"
恢复执行 → Agent 从断点续跑，调用财务系统打款
通知员工 → 发送"报销已到账"消息


```
pip install fastapi uvicorn langgraph langchain-core
uvicorn main:app --reload

pip install -r requirements.txt
```
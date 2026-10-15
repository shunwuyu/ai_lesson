// compose 只建 root 管理员和空数据库；脚本用来新建**权限更小的业务账号**，
// 并且提前创建集合（Mongo 不强制提前建集合，属于工程规范）。
// 切换到另一个数据库
db = db.getSiblingDB("knowledge_hub");
// 创建用户 普通用户
db.createUser({
  user: "knowledge_hub_user",
  pwd: "knowledge_hub_password",
  roles: [{ role: "readWrite", db: "knowledge_hub" }],
});

// 创建集合
// 创建集合 kh_document
db.createCollection("kh_document");

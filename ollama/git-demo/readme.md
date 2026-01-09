#  Conventional Commits 

Conventional（常规型的） Commits 是一套标准化的 Git 提交信息书写规范，本质是给提交日志定了 “统一模板”，让杂乱的提交信息变得结构化、可读、可自动化处理。

```
<类型>[可选作用域]: <简短描述>

[可选：详细正文（多行）]

[可选：脚注（比如关联Issue、标注破坏性变更）]
```
1.png
```
// git diff 关键内容示例
diff --git a/src/api/user.js b/src/api/user.js
index 1234567..89abcde 100644
--- a/src/api/user.js
+++ b/src/api/user.js
@@ -10,6 +10,15 @@ export const login = (data) => {
   return request.post('/auth/login', data);
 };

+// 新增用户注册接口
+export const register = (data) => {
+  return request.post('/auth/register', {
+    username: data.username,
+    password: data.password,
+    email: data.email
+  });
+};
+
 export const getUserInfo = () => {
   return request.get('/user/info');
 };
```

```
feat(auth): add user register api

- 新增POST /auth/register接口
- 支持用户名、密码、邮箱参数校验
Closes #78  // 关联Issue #78
```
```
旧代码
export const login = (data) => {
  return request.post('/auth/login', data);
};

export const getUserInfo = () => {
  return request.get('/user/info');
};
```
```
新代码
export const login = (data) => {
  return request.post('/auth/login', data);
};

// 新增用户注册接口
export const register = (data) => {
  return request.post('/auth/register', {
    username: data.username,
    password: data.password,
    email: data.email
  });
};

export const getUserInfo = () => {
  return request.get('/user/info');
};
```

## 案例 2：git diff 显示 “修复用户列表分页数据缺失”

```
// git diff 关键内容示例
diff --git a/src/utils/pagination.js b/src/utils/pagination.js
index 789abcd..123efgh 100644
--- a/src/utils/pagination.js
+++ b/src/utils/pagination.js
@@ -25,7 +25,7 @@ export const calculatePageData = (list, pageNum, pageSize) => {
   // 原代码：结束索引计算错误，导致最后一页数据缺失
-  const end = pageNum * pageSize;
+  const end = Math.min(pageNum * pageSize, list.length);
   return list.slice(start, end);
 };
```

```
fix(user): fix pagination data missing in user list

- 修复分页结束索引计算错误，解决最后一页数据缺失问题
- 增加边界值校验，避免索引越界
```

``` 
旧版本
export const calculatePageData = (list, pageNum, pageSize) => {
  // 假设 start 已正确计算（例如：const start = (pageNum - 1) * pageSize;）
  // 原代码：结束索引计算错误，导致最后一页数据缺失
  const end = pageNum * pageSize;
  return list.slice(start, end);
};
```

```
export const calculatePageData = (list, pageNum, pageSize) => {
  // 假设 start 已正确计算（例如：const start = (pageNum - 1) * pageSize;）
  // 原代码：结束索引计算错误，导致最后一页数据缺失
  const end = Math.min(pageNum * pageSize, list.length);
  return list.slice(start, end);
};
```

### git diff 显示 “仅调整代码缩进（无逻辑改动）”

```
// git diff 关键内容示例
diff --git a/src/utils/date.js b/src/utils/date.js
index abc1234..def5678 100644
--- a/src/utils/date.js
+++ b/src/utils/date.js
@@ -5,8 +5,8 @@ export const formatDate = (date) => {
   const year = date.getFullYear();
   const month = date.getMonth() + 1;
   const day = date.getDate();
-return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
+  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
 };
```
```
style(utils): format code indentation in date.js
```

- 案例 4：git diff 显示 “更新 package.json 依赖（axios 升级）”
```
// git diff 关键内容示例
diff --git a/package.json b/package.json
index 1112223..4445556 100644
--- a/package.json
+++ b/package.json
@@ -20,7 +20,7 @@
   "dependencies": {
     "react": "^18.2.0",
     "react-dom": "^18.2.0",
-    "axios": "^1.6.0",
+    "axios": "^1.6.5",
     "vue": "^3.3.4"
   }
```
```
chore(deps): update axios to v1.6.5
```

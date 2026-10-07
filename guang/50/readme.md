项目会涉及到一些数据库、中间件（ES、Neo4j 广义属于数据中间件，本质分别是搜索引擎、图数据库。）用于存储数据：

PostgreSQL（带 PGVector 向量扩展）：
存储结构化业务数据 + 文档分片向量

- 用户、角色、权限全量 RBAC 数据：（Role‑Based Access Control， 基于角色的访问控制）
  将权限和用户解耦， 通过角色来管理权限。比如张三晋升了， 只要修改他的角色， 就可以改变他的权限。
user 用户表、role 角色表、permission 权限表、department 部门表等

CREATE TABLE IF NOT EXISTS kh_user (
    id BIGINT PRIMARY KEY,                          -- 用户 ID（雪花）
    username VARCHAR(50) NOT NULL,                  -- 登录用户名
    password VARCHAR(255) NOT NULL,                 -- 密码（bcrypt 哈希）
    email VARCHAR(100),                             -- 邮箱（可选）
    real_name VARCHAR(50),                          -- 真实姓名 / 显示名
    avatar VARCHAR(500),                            -- 头像 URL
    email_verified SMALLINT NOT NULL DEFAULT 1,     -- 0 未验证 1 已验证
    status SMALLINT NOT NULL DEFAULT 1,             -- 0 禁用 1 启用
    last_login_at TIMESTAMP,                        -- 最后登录时间
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),    -- 创建时间
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),    -- 更新时间
    deleted BOOLEAN NOT NULL DEFAULT false          -- 软删除标记
);
-- 未删除用户名唯一
CREATE UNIQUE INDEX IF NOT EXISTS uk_kh_user_username ON kh_user(username) WHERE deleted = false;


`kh_` 是**表名前缀（table prefix）**，`kh`一般是项目 / 业务缩写，`kh_user`代表该项目下的用户表， 一眼就看出
`INT`：4 字节，最大值约 **21 亿**
`BIGINT`：8 字节，最大值 **922 亿亿**
预留容量，防溢出

deleted 是软删除标记。删用户不会真正删掉数据库数据，只是把它置 true，查询时过滤掉，方便恢复数据。

**只对未删除的数据做用户名唯一约束**，已软删用户允许重名

CREATE TABLE IF NOT EXISTS kh_role (
    id BIGINT PRIMARY KEY,                          -- 角色 ID（雪花）
    role_name VARCHAR(50) NOT NULL,                 -- 角色名称（展示用）
    role_code VARCHAR(50) NOT NULL UNIQUE,          -- 角色编码，如 ROLE_ADMIN / ROLE_REVIEWER / ROLE_USER
    description VARCHAR(200),                     -- 角色描述
    status SMALLINT NOT NULL DEFAULT 1              -- 0 禁用 1 启用
);
role_code 是程序识别用编码，保证唯一。role_name 给人看可修改，编码固定不变，代码通过编码判断权限，不受名称改动影响。

CREATE TABLE IF NOT EXISTS kh_user_role (
    id BIGINT PRIMARY KEY,                          -- 关联 ID（雪花）
    user_id BIGINT NOT NULL REFERENCES kh_user(id), -- 用户 ID
    role_id BIGINT NOT NULL REFERENCES kh_role(id), -- 角色 ID
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),    -- 分配时间
    UNIQUE (user_id, role_id)
);
CREATE INDEX IF NOT EXISTS idx_kh_user_role_user_id ON kh_user_role(user_id);

-- 预置角色
INSERT INTO kh_role (id, role_name, role_code, description) VALUES
    (2000000000000000001, '管理员', 'ROLE_ADMIN', '系统管理'),
    (2000000000000000002, '审核员', 'ROLE_REVIEWER', '文档审核'),
    (2000000000000000003, '普通用户', 'ROLE_USER', '默认角色')
ON CONFLICT (id) DO NOTHING;

-- 测试账号（密码均为 123456，bcrypt）
INSERT INTO kh_user (id, username, password, email, real_name, status) VALUES
    (1000000000000000001, 'admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi', 'admin@company.com', '系统管理员', 1),
    (1000000000000000002, 'reviewer', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi', 'reviewer@company.com', '审核员张三', 1),
    (1000000000000000003, 'user', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi', 'user@company.com', '普通用户李四', 1)
ON CONFLICT (id) DO NOTHING;

INSERT INTO kh_user_role (id, user_id, role_id) VALUES
    (3000000000000000001, 1000000000000000001, 2000000000000000001),  -- admin → 管理员
    (3000000000000000002, 1000000000000000001, 2000000000000000002),  -- admin → 审核员
    (3000000000000000003, 1000000000000000002, 2000000000000000002),  -- reviewer → 审核员
    (3000000000000000004, 1000000000000000003, 2000000000000000003)   -- user → 普通用户
ON CONFLICT (id) DO NOTHING;


- 文档、分片：
document 文档表、doc_chunk 文档分片表
`document`（文档主表）：存文档整体元信息，比如文档名称、上传人、上传时间、原始文件地址、状态。一条记录对应**一整个原始文档**（如一份 PDF）。
`doc_chunk`（分片子表）：**核心为向量检索设计**。大文档不能直接向量化，需要拆成小段（分片 /chunk），每条分片记录保存：片段文本、**该文本对应的向量 embedding**，存入 pgvector 做向量相似度召回。

- AI 问答会话历史
chat_session 对话会话表、chat_message 问答消息记录表

ElasticSearch（全文关键词检索引擎）：
文档分片全文索引库，负责关键词召回、全文模糊检索

Neo4j（知识图谱图数据库）：
存储实体、关系，支撑多跳图谱推理检索

Redis（缓存中间件）：
缓存、临时数据等

- 短期记忆：滑动窗口、近期对话摘要
- 全局缓存数据：用户权限等
- 排行榜：热门文档等

MinIO（对象存储）：
存储全部静态文件资源

- 用户上传原始文件：PDF、Word、PPT、图片、音频、视频源文件
- 文档解析资源：解析后内嵌图片

Mem0（长期记忆存储）：

- 用户级长期记忆：用户个人偏好、检索偏好、业务角色习惯
- 会话级长期记忆：单次对话上下文



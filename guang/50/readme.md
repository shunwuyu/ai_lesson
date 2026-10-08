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

CREATE TABLE IF NOT EXISTS kh_permission (
    id BIGINT PRIMARY KEY,                          -- 权限 ID（雪花）
    parent_id BIGINT NOT NULL DEFAULT 0,            -- 父权限 ID，0 为根
    permission_name VARCHAR(50) NOT NULL,           -- 权限名称
    permission_code VARCHAR(100) NOT NULL UNIQUE,   -- 权限编码（运行时校验）
    permission_type SMALLINT NOT NULL,              -- 1 菜单 2 按钮 3 接口
    menu_url VARCHAR(200),                          -- 菜单路径
    api_url VARCHAR(500),                           -- 接口 URL 模式
    method VARCHAR(10),                             -- HTTP 方法
    icon VARCHAR(50),                               -- 图标
    sort INT NOT NULL DEFAULT 0,
    status SMALLINT NOT NULL DEFAULT 1,             -- 0 禁用 1 启用
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted BOOLEAN NOT NULL DEFAULT false
);


权限表数据量极小，系统权限撑死几百条，`INT` 完全够用。
但很多项目**统一全局主键规范**：所有业务表 id 一律 BIGINT，不管表数据大小，避免不同表 id 类型不一致，关联、VO、代码实体类来回切换类型踩坑。
程序本地按位拼接毫秒时间戳、机器 ID（并发不同服务器） 
时间戳都一样、同一毫秒，两台机器生成的 ID，靠这个数字区分开，就不会撞 ID。
同一台机器、同一毫秒内，从 0 开始自增，解决 1 毫秒生成多个 ID

parentId 用来搭建权限树形结构，区分父子权限，实现菜单层级、按钮归属的关联管理。
system:user:list system 模块下用户模块的列表查询权限，用于控制查看用户列表操作。

区分权限类型 1 菜单、2 按钮、3 接口，做不同权限管控。
menu_url 存储前端菜单路由地址，用来渲染侧边菜单页面跳转路径。 permission_type=1 才会有这个
api_url 存后端接口路径，配合 permission_type=3，用于接口层面鉴权拦截。

sort 控制菜单权限展示顺序，数值越小，排序越靠前。 
deleted 软删除

CREATE TABLE IF NOT EXISTS kh_role_permission (
    id BIGINT PRIMARY KEY,
    role_id BIGINT NOT NULL REFERENCES kh_role(id),
    permission_id BIGINT NOT NULL REFERENCES kh_permission(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE (role_id, permission_id)
);

CREATE TABLE IF NOT EXISTS kh_user_permission (
    id BIGINT PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES kh_user(id),
    permission_id BIGINT NOT NULL REFERENCES kh_permission(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, permission_id)
);



INSERT INTO kh_permission (id, parent_id, permission_name, permission_code, permission_type, menu_url, icon, sort) VALUES
    (4000000000000000001, 0, '首页', 'dashboard', 1, '/dashboard', 'DashboardOutlined', 1),
    (4000000000000000002, 0, '文档中心', 'document', 1, '/documents', 'FileTextOutlined', 2),
    (4000000000000000003, 0, '搜索', 'search', 1, '/search', 'SearchOutlined', 3),
    (4000000000000000004, 0, '个人中心', 'profile', 1, '/profile', 'UserOutlined', 4),
    (4000000000000000005, 0, '系统管理', 'system', 1, '/admin', 'SettingOutlined', 5)
ON CONFLICT (id) DO NOTHING;

INSERT INTO kh_permission (id, parent_id, permission_name, permission_code, permission_type, sort) VALUES
    (4000000000000000011, 4000000000000000002, '文档列表', 'document:list', 2, 1),
    (4000000000000000012, 4000000000000000002, '创建文档', 'document:create', 2, 2),
    (4000000000000000013, 4000000000000000002, '编辑文档', 'document:edit', 2, 3),
    (4000000000000000014, 4000000000000000002, '删除文档', 'document:delete', 2, 4),
    (4000000000000000015, 4000000000000000002, '文档审核', 'document:review', 2, 5)
ON CONFLICT (id) DO NOTHING;

INSERT INTO kh_permission (id, parent_id, permission_name, permission_code, permission_type, menu_url, sort) VALUES
    (4000000000000000021, 4000000000000000005, '用户管理', 'system:user', 1, '/admin/users', 1),
    (4000000000000000022, 4000000000000000005, '角色管理', 'system:role', 1, '/admin/roles', 2),
    (4000000000000000023, 4000000000000000005, '权限管理', 'system:permission', 1, '/admin/permissions', 3),
    (4000000000000000024, 4000000000000000005, '团队管理', 'system:team', 1, '/admin/teams', 4)
ON CONFLICT (id) DO NOTHING;

INSERT INTO kh_permission (id, parent_id, permission_name, permission_code, permission_type, sort) VALUES
    (4000000000000000041, 4000000000000000023, '新增权限', 'system:permission:create', 2, 1),
    (4000000000000000042, 4000000000000000023, '编辑权限', 'system:permission:edit', 2, 2),
    (4000000000000000043, 4000000000000000023, '删除权限', 'system:permission:delete', 2, 3)
ON CONFLICT (id) DO NOTHING;

INSERT INTO kh_role_permission (id, role_id, permission_id) VALUES
    (4100000000000000001, 2000000000000000002, 4000000000000000011),
    (4100000000000000002, 2000000000000000002, 4000000000000000015),
    (4100000000000000003, 2000000000000000003, 4000000000000000001),
    (4100000000000000004, 2000000000000000003, 4000000000000000002),
    (4100000000000000005, 2000000000000000003, 4000000000000000011),
    (4100000000000000006, 2000000000000000003, 4000000000000000012),
    (4100000000000000007, 2000000000000000003, 4000000000000000003),
    (4100000000000000008, 2000000000000000003, 4000000000000000004),
    (4100000000000000009, 2000000000000000003, 4000000000000000013),
    (4100000000000000010, 2000000000000000003, 4000000000000000014),
    (4100000000000000011, 2000000000000000002, 4000000000000000003)
ON CONFLICT (id) DO NOTHING;


角色权限是批量给角色分配权限；用户权限用于给个别用户做**额外特权 / 临时权限**，绕过角色，实现用户级单独授权。


- 文档、分片：
document 文档表、doc_chunk 文档分片表
`document`（文档主表）：存文档整体元信息，比如文档名称、上传人、上传时间、原始文件地址、状态。一条记录对应**一整个原始文档**（如一份 PDF）。
`doc_chunk`（分片子表）：**核心为向量检索设计**。大文档不能直接向量化，需要拆成小段（分片 /chunk），每条分片记录保存：片段文本、**该文本对应的向量 embedding**，存入 pgvector 做向量相似度召回。

```
CREATE TABLE IF NOT EXISTS kh_document (
    id BIGINT PRIMARY KEY,
    title VARCHAR NOT NULL,
    content_id VARCHAR NOT NULL UNIQUE,
    summary VARCHAR,
    category_id BIGINT, -- 分类 ID
    team_id BIGINT, -- 团队 ID
    author_id BIGINT, -- 作者 ID
    cover_image VARCHAR, -- 封面图片 URL
    tags VARCHAR, -- 标签，逗号分隔
    status SMALLINT NOT NULL DEFAULT 0, 
    remark VARCHAR, -- 备注
    view_count INT NOT NULL DEFAULT 0, -- 查看次数
    like_count INT NOT NULL DEFAULT 0, -- 点赞次数
    comment_count INT NOT NULL DEFAULT 0, -- 评论次数
    favourite_count INT NOT NULL DEFAULT 0, -- 收藏次数
    word_count INT NOT NULL DEFAULT 0, -- 单词数
    publish_time TIMESTAMP,
    is_public BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    create_by BIGINT, -- 创建人 ID
    update_by BIGINT, -- 更新人 ID
    deleted BOOLEAN NOT NULL DEFAULT false -- 软删除
);
```
kh_document 存文档基础信息，比如文档名称、来源、上传时间。再拆成分片存进 kh_doc_chunk，用来做向量检索。
`kh_document`（文档主表）主键 `id`，作为外键 `document_id` 放在分片向量表 `kh_doc_chunk`。
content_id 是业务上标识文档内容的唯一 ID，可保存对象存储的文件标识
word_count 记录这份文档的总字数。 用于前端展示文档字数统计，做解析校验，也可辅助分片、估算向量库占用，不用每次实时计算文本长度。
is_public true：知识库全员可见，不用单独授权   false：私有文档，仅所属团队、有权限用户才能访问。
status 0：**待解析**  1：**解析成功** 2：**解析失败** 3：**解析中**

-- 文档发布审核记录
-- 一次「提交审核」一行；approve/reject 后 review_result 非空，不再出现在待办列表
CREATE TABLE IF NOT EXISTS kh_document_review (
    id BIGINT PRIMARY KEY,                          -- 审核记录 ID（雪花）
    document_id BIGINT NOT NULL,                    -- 被审文档 ID → kh_document.id
    reviewer_id BIGINT,                             -- 审核人 ID；待审时为 NULL
    reviewer_name VARCHAR,                          -- 审核人姓名
    review_result SMALLINT,                         -- NULL=待审 1=通过 2=驳回
    review_comment VARCHAR,                         -- 审核意见（驳回必填）
    before_status SMALLINT NOT NULL,                -- 提审前文档 status（0 草稿 / 1 已发布）
    reviewed_at TIMESTAMP,                          -- 审核完成时间
    created_at TIMESTAMP NOT NULL DEFAULT NOW()     -- 提交审核时间
);

CREATE INDEX IF NOT EXISTS idx_kh_document_review_document_id ON kh_document_review (document_id);
给 kh_document_review 表的 document_id 字段创建普通 B‑Tree 索引，加快按文档 ID 查询审核记录的速度。
CREATE INDEX IF NOT EXISTS idx_kh_document_review_pending ON kh_document_review (review_result) WHERE review_result IS NULL;
这是**部分索引（条件索引）**，只对`review_result IS NULL`待审记录建索引。
原因：只加速查询待审核任务，索引体积小，查询更快，不占用无效存储。

因为 reviewer_id 存用户 ID，要联表才能拿到姓名。冗余 reviewer_name，查审核记录不用关联用户表，直接展示名字，提升查询速度，缺点是用户改名后这里不会自动更新。
before_status 记录文档**提交审核那一刻原本是什么状态**。 0：草稿 1：已发布
CREATE INDEX IF NOT EXISTS idx_kh_document_review_document_id ON kh_document_review (document_id);


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



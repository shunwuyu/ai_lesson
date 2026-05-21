CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '用户ID',
    username VARCHAR(50) NOT NULL COMMENT '登录账号',
    password VARCHAR(100) NOT NULL COMMENT '加密密码',
    nickname VARCHAR(50) NOT NULL COMMENT '用户昵称',
    avatar VARCHAR(255) COMMENT '头像地址',
    phone VARCHAR(11) NOT NULL COMMENT '手机号',
    gender CHAR(1) COMMENT '性别',
    birth DATE COMMENT '出生日期',
    balance DECIMAL(10, 2) DEFAULT 0.00 COMMENT '账户余额',
    register_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
    last_login_time DATETIME COMMENT '最后登录时间',
    status ENUM('active', 'inactive') DEFAULT 'active' COMMENT '用户状态',
)
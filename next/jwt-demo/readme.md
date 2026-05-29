- mysql
    create database shu;
    use shu;

    ```sql
    CREATE TABLE `User` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `username` VARCHAR(64) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(32) NOT NULL DEFAULT 'user',
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  `lastLoginAt` DATETIME(3) NULL,
  `isActive` BOOLEAN NOT NULL DEFAULT true,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`),
  UNIQUE KEY `User_username_key` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    ```

    - 索引
    主键索引，唯一标识每条记录。
    查询、更新、删除通过 id 非常高效。
    UNIQUE KEY (email)	唯一	防重 + 登录查询
    UNIQUE KEY (username)	唯一	防重 + 用户名
   
   createdAt DATETIME(3) 表示创建时间，精确到毫秒（3位小数），存储记录生成的日期和时间。

   

## 流程

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b61a509885e41fbba4d955933907797~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

## 需求分析

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6bcfa727648c4c73be85524e8b028550~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

- 用户登录
  1. 用户需求
    1.1 登录与注册
    功能描述：用户可以通过手机号或邮箱进行注册，并通过用户名和密码登录。
    需求点：
    注册时需要验证手机号或邮箱的有效性。
    登录时需要验证用户名和密码的正确性。
    提供忘记密码功能，通过邮箱或短信验证码重置密码。
    1.2 记账功能
    功能描述：用户可以记录日常的收入和支出，并对每一笔交易进行分类（如餐饮、交通、购物等）。
    需求点：
    支持快速输入金额和备注。
    支持选择预设的类别或自定义类别。
    提供搜索功能，方便用户查找特定的记账记录。
    支持编辑和删除已有的记账记录。
    1.3 数据统计与分析
    功能描述：应用能够根据用户的记账数据生成图表和报告，帮助用户了解自己的财务状况。
    需求点：
    生成月度、季度和年度的收支报表。
    提供饼图、柱状图等多种图表展示方式。
    支持按类别查看支出和收入的分布情况。
    1.4 用户管理
    功能描述：用户可以管理自己的个人信息和设置。
    需求点：
    修改个人资料（如头像、昵称等）。
    设置提醒功能，提醒用户定期记账。
    提供导出数据功能，方便用户备份数据。
  2. 技术需求
    2.1 前端技术栈
    react 样式：CSS-in-JS 或 styled-components，用于编写样式。 zarm
    2.2 后端技术栈
    node egg.js 
    数据库 MySQL 
    认证与授权：JWT（JSON Web Tokens），用于用户认证和会话管理
  3. 设计需求
    3.1 用户界面设计
    如图
  4.  部署与运维
    4.1 服务器配置
    服务器：阿里云
    数据库：阿里云 RDS


## 数据库设计
  Mysql 关系型数据库
  MongoDB 非关系型数据库 NoSQL  不需要sql 

  CREATE DATABASE IF NOT EXISTS juejue_cost;

  CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    ctime VARCHAR(100) NOT NULL,
    avatar VARCHAR(100),
    signature VARCHAR(100),
    password VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


  账单表
  id：每张表都需要一个主键，我们照旧，用 id 作为「账单表」的属性。
  pay_type：账单类型，账单无非就是两种类型，支出和收入，我们用 pay_type 作为类型字段，这里约定好 1 为支出，2 为收入。
  amount：账单价格，每个账单都需有一个价格属性，表示该笔账单你消费或收入了多少钱。
  date：账单日期，日期可自由选择，以时间戳的形式存储。
  type_id：账单标签 id，如餐饮、交通、日用、学习、购物等。
  type_name：账单标签名称，如餐饮、交通、日用、学习、购物等。
  user_id：账单归属的用户 id，本小册制作的是多用户项目，相当于可以有多个用户来注册使用，所以存储账单的时候，需要将用户的 id 带上，便于后面查询账单列表之时，过滤出该用户的账单。
  remark：账单备注。

  CREATE TABLE IF NOT EXISTS bill (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pay_type INT,
    amount VARCHAR(100),
    date VARCHAR(100),
    type_id INT,
    type_name VARCHAR(100),
    user_id INT,
    remark VARCHAR(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

  标签表 

  开始我是想在前端把标签定死，比如服饰、交通、医疗等等这类账单种类，写成一个静态的对象，供前端项目使用。但是这样做有一个不好的地方，后续如果希望让用户自己添加自定义标签，就不好拓展。所以这里我们在数据库中设置一张 type 表，让用户可以灵活的设置属于自己的自定义标签。

  id：唯一标识，设为主键。

  name：标签名称，如餐饮、交通、日用、学习、购物等。

  type：标签类型，默认 1 为收入，2 为支出。

  user_id：保留字段，设置该标签的用户归属，默认 0 为全部用户可见，某个用户单独设置的标签，user_id 就是该用户的用户 id，在获取列表的时候，方便过滤。

  CREATE TABLE IF NOT EXISTS type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type INT,
    user_id INT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


## Egg

  Egg 作为一套解决方案，它内部高度集成了封装好的项目目录结构，现代开发俗称“约定式开发”。

  你从 0 开始搭建一个 Node 服务端代码，需要结合很多工具插件来辅助完成项目的搭建，而 Egg 则提前为你提供好了这些繁琐的初始工作，让你能专心与业务层面的开发。

  - npm run dev
    聊下mvc 概念 介绍egg 的结构
    ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8a6e2954b379440d87573dbe452e5cc2~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

    都会触发安防策略。  csrf
  
## 用户鉴权

我认为鉴权就是用户在浏览网页或 App 时，通过约定好的方式，让网页和用户建立起一种相互信赖的机制，继而返回给用户需要的信息。
鉴权的机制，分为四种：
- HTTP Basic Authentication
- session-cookie
- Token 令牌
token 可以运用在如网页、客户端、小程序、浏览器插件等等领域。如果选用 cookie 的形式鉴权，在客户端和小程序就无法使用这套接口，因为它们没有域的概念，而 cookie 是需要存在某个域下。
- OAuth(开放授权)
### 注册
  - npm install --save egg-sequelize mysql2
  - exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};
  - exports.sequelize = {
  dialect: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  database: 'egg-sequelize-doc-default',
};
  - model/user.js
  - controler/user.js
  - service/user.js

### 注册


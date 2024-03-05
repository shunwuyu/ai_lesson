- use xb2_node
    source D:\workspace\ai_lesson\interview\sql_\xb2_node.sql

- 索引
     KEY `userId` (`userId`),
     CONSTRAINT `avatar_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
     longtext   
        4GB  
    json  {}

    postId 和 tagId 作为联合主键 确保每个帖子与标签的组合是唯一的，同时还能够提高针对这两个字段的查询效率
    查询符合条件的帖子和标签组合
    SELECT * FROM post_tag WHERE postId = 1 AND tagId = 2;
    插入新的帖子和标签组合：
    INSERT INTO post_tag (postId, tagId) VALUES (3, 4);
    更新现有帖子和标签组合的数据：
    UPDATE post_tag SET postId = 5 WHERE postId = 1 AND tagId = 2;
    删除特定的帖子和标签组合：
    DELETE FROM post_tag WHERE postId = 1 AND tagId = 2;

    UNIQUE KEY `name` (`name`)


- status code 

    400 Bad Request
    409 Conflict
    401 Unauthorized
    404 Not Found
    500 服务器出错
    201 Created

    https://github.com/ninghao/xb2-node/blob/master/src/app/app.middleware.ts

    301 Moved Permanently  永久
    302 Found   
        当用户访问该产品页面时，服务器会返回一个 302 状态码，并告诉客户端这个资源临时移动到另一个位置。响应头中会包含一个 Location 字段，指示客户端应该暂时跳转到新地址。用户会被重定向到一个临时的页面，显示产品暂时下架的信息，不会对搜索引擎索引产生影响
        POST -> GET  
    307 Temporary Redirect
        http://www.baidu.com  https://www.baidu.com 

        如果原始请求是POST请求，经过307重定向后，客户端应该继续使用POST方法重新发起请求。

        临时重定向：表示所请求的页面已临时移至另一个位置。
保持请求方法：客户端应该保持相同的请求方法（GET、POST等）重新发起请求。
不会更改请求方法：与302状态码不同，307状态码不会将POST请求变为GET请求。

304 Not Modified
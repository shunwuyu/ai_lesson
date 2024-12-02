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

## 背包   01  完全

https://www.bilibili.com/video/BV1cg411g7Y6/?spm_id_from=333.788&vd_source=3d50341f547faf8df242a214b04f2d86

- 01 背包  ->进化-> 完全背包 -> 多重背包
    n 种物品， 每种只有1个
    n 种物品， 每种有多个 完全
    n 种物品， 每种数量各不相同
    物品个数上的不同

物品     重量        价值
物0      1            15
物1      3            20
物2      4            30

背包最大承受重量 4

暴力解法
    每个物品取与不取   时间复杂度是 2^n  

动态规划 性能提升了多少
    - 动规五部曲
        - 明确dp数组的定义
            二维（基础）或一维（优化）  从二维优化到一维
            先二维
            dp[i][j]   [0,i]物品 任取放进容量为j的背包中，得到的最大价值
        - 状态转移方程
            dp[i][j]
            不放 dp[i-1][j]
            放  dp[i-1][j-w[i]]  + v[i]
            dp[i][j] = max(dp[i-1][j], dp[i-1][j-w[i]] + v[i])
        - 初始化
            方向推出？  上面和左上角
            有图  上一行和左一列
            不要乱初始化   图2
            非0下标， 怎么初始化？ 初始化为0也可以，会被盖

        - 遍历顺序
            for()  {             // 物品
                for() {          // 容量

                }
            }
    - 滚动数组
        二维变一维， 状态可以被压缩 
        i-1层的数据拷贝到i层？直接在第i层计算呢？这就是滚动数组的由来
        矩阵压缩成一行 每一次就更新这一行，看上去像在滚动一样
        - 动规五部曲
            - dp[j]  j 与二维的一样 容量为j的背包最大价值
            dp[j] = Max(dp[j], dp[j-w[i]]+v(i))不放入i
            dp[j] 把上一层的数据拷贝下来了，
            - 初始化
                简单
                dp[0] 0 
                非0下标 0
            - 遍历顺序  倒序
                for(i=0;i<w.length;i++) {
                    for(j=bagweight;j>=0;j--) {

                    }
                }
                dp[1] = dp[1-1] + 15 = 15
                dp[2] = dp[2-1] + 15 = 30   加了两次
                不符合01背包只能用一次的规则
                为什么倒序遍历就可以
                dp[2] = dp[2-1] + 15 = 15
                dp[1] = dp[1-1] + 15 = 15
                只加一次
                





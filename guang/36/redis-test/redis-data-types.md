Redis 核心数据类型手册
一、String 字符串
适用场景：验证码（60s过期）、Token、登录会话、计数器、分布式锁、配置项、文本类短期记忆

核心命令

set key value 
get key 
setex key 秒数 value 
存键值，**key 不存在才写入**，同时设置 TTL 过期秒数，常用于验证码防重。
set key value nx ex 秒数 
Redis 自增命令，给 key 对应的数字值 + 1
incr key 
decr key 
incrby key 步长

真实业务示例

手机验证码，5 分钟过期 
set ex verification:mobile:13800138000 300 "666888"

用户登录 Token，24 小时过期 
setex session:token:adf245kjndsa3 86400 "userid:1001"

文章阅读量自增 
incr counter:article:1024

分布式锁，10 秒过期，防止重复执行 
set lock:order:2001 "locked" nx ex 10

AI 对话摘要，1 小时过期 
setex agent:memory:user:1001 3600 "用户想学习 PostgreSQL 向量检索"

二、Hash 哈希
适用场景：用户信息、商品资料、电商购物车、结构化对话上下文

核心命令

hset key field value 
hmset key field1 value1 field2 value2 
hget key field 
hgetall key 
hkeys key 
hvals key 
hincrby key field 增量

真实业务示例

存储用户基础信息 
hset user:info:1001 name "张三" age 28 phone "13800138000"

电商购物车，字段为商品 ID，值为购买数量 
hset cart:user:1001 product:10086 2 product:10087 1

存储 AI 会话完整上下文 
hset agent:session:user:1001 messages "最近 5 轮对话" summary "对话摘要"

三、List 列表
适用场景：消息队列、任务队列、操作日志、聊天历史、有序记录

核心命令

lpush key value1 value2 
rpush key value1 value2 
读取 List 列表全部数据。
lrange key 0 -1 
lpop key 
rpop key 
llen key

真实业务示例

订单消息队列，右侧入队 rpush queue:order "order_1001" "order_1002"

用户浏览历史，左侧插入最新记录 lpush user:history:1001 "查看了 AI 课程" "查看了 Redis 教程"

后台任务队列 rpush queue:task "生成对话摘要" "向量入库"

四、Set 集合
适用场景：数据去重、每日签到、IP 黑名单、共同好友、权限标签

核心命令

sadd key value1 value2 
smembers key 
判断`value`是否存在于集合`key`中，存在返回 1，不存在返回 0，适合做黑名单校验。
sismember key value 
**sinter key1 key2**：求两个集合的交集，返回同时存在于 key1、key2 中的元素，用来取两边都有的数据。
sinter key1 key2 
**sunion key1 key2**：求两个集合的并集，返回 key1、key2 中的所有元素，用来取两边都有或没有的数据。
sunion key1 key2 
**sdiff key1 key2**：求两个集合的差集，返回 key1 中存在而 key2 中不存在的元素，用来取 key1 中有而 key2 中没有的数据。
sdiff key1 key2

真实业务示例

记录当日签到用户 sadd sign:20250820:user 1001 1002 1003

网站 IP 黑名单 sadd blacklist:ip "192.168.1.100" "192.168.1.101"

查询两位用户的共同好友 sinter user:friend:1001 user:friend:1002

五、ZSet 有序集合
适用场景：各类排行榜、内容热度排序、用户积分排名、权重队列

核心命令

zadd key score member 
zrange key 0 -1 
zrevrange key 0 -1 
zscore key member 
zrank key member

真实业务示例

课程热度排行榜，数值为热度分数 zadd rank:course 98 "PostgreSQL 实战" 95 "AI Agent 开发" 92 "Redis 从入门到精通"

用户积分排行榜 zadd rank:user:points 1000 "张三" 850 "李四"

文章热度排序 zadd hot:article 1200 "article:1024" 980 "article:1025"

六、Bitmap 位图
适用场景：海量用户签到记录、在线状态统计、布尔型数据存储，极致节省内存

核心命令

setbit key 偏移量 0/1 
getbit key 偏移量 
bitcount key

真实业务示例

记录用户当月签到，第 5 天、第 10 天完成签到 
setbit user:sign:1001:202508 5 1 
setbit user:sign:1001:202508 10 1

统计该用户当月总签到天数 
bitcount user:sign:1001:202508

七、Geo 地理位置
适用场景：附近门店、附近的人、两地距离计算、位置检索

核心命令

geoadd key 经度 纬度 名称 
geodist key 名称1 名称2 km

真实业务示例

添加线下门店经纬度信息 
geoadd shop:location 116.481028 39.921983 "北京总店"

计算两家门店之间的直线距离，单位千米 geodist shop:location "北京总店" "上海分店" km

数据类型场景速查表
数据类型	典型业务场景
String	验证码、Token、计数器、分布式锁、文本记忆
Hash	用户信息、商品数据、购物车、结构化会话
List	消息队列、任务队列、浏览/聊天历史
Set	签到、数据去重、黑名单、好友关系
ZSet	排行榜、热度排序、积分排名
Bitmap	批量签到、海量布尔状态统计
Geo	位置检索、距离计算、附近门店/人群
# Agent 的对象存储方案： MinIO、RustFS、阿里云 OSS（对象存储服务）

AI Agentᵠ 在跑业务的时候，时时刻刻都要读写各种文件。

不管是上传的文档，还是 AI 自己生成的报表、图片视频

普通本地文件夹根本扛不住海量文件的生产场景。

所以要用对象存储（Object Storage）

叫“对象存储”是因为它不以目录树或磁盘块来管理数据，而是把每个文件当成一个带唯一 ID 和元数据的“对象”来存取。

比如这三类场景：

- 存放 RAGᵠ 知识库所有原始文件，给智能问答提供数据源
- 保存 Agent 自动运行产出的报表、图表、运行日志
- 统一存图片、音频、视频，支撑多模态 AI 处理任务

我们使用阿里云 OSS 作为对象存储。

我们本地存储是 目录-文件的真实树状组织方式：
而OSS对象存储底层是扁平化结构

每个 Object 对象包含三部分核心信息：唯一 Key 标识、文件二进制内容、自定义元数据：



## 购买

https://www.aliyun.com/product/oss
点击购买
选 标准-本地冗余存储
中国内地
40GB 
6个月

https://oss.console.aliyun.com/bucket

可以访问

OSS_ACCESS_KEY_ID   头像 AccessKey  强烈建议使用 RAM 用户
AccessKey ID
AccessKey Secret
OSS_BUCKET=agent-bucket2021 名字
读写权限 公开读写

```
中文地域名称	Region ID (OSS_REGION)
中文地域名称	Region ID (OSS_REGION)
华东1（杭州）	cn-hangzhou
华东2（上海）	cn-shanghai
华北1（青岛）	cn-qingdao
华北2（北京）	cn-beijing
华北3（张家口）	cn-zhangjiakou
华北5（呼和浩特）	cn-huhehaote
华北6（乌兰察布）	cn-wulanchabu
华南1（深圳）	cn-shenzhen
华南2（河源）	cn-heyuan
华南3（广州）	cn-guangzhou
西南1（成都）	cn-chengdu
中国香港	cn-hongkong
```


## MinIO 

直接用阿里云的 OSS 是挺方便，但是要花钱，而且企业内部有的资料也不希望上云。
这种情况就要自己搭 OSS 服务了：
比如 MinIO 或者 RustFS

## MinIO
- docker compose up -d 
- http://localhost:9001/
admin
Admin@123456
创建一个bucket  aaa
上传一张图片
点击share 下载链接
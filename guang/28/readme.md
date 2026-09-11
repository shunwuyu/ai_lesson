# ElasticSearch全文检索

- docker 安装
新建es-test, docoker-compose

跑elastic search 和 kibana
es: 用于对海量数据进行近实时的全文检索、结构化查询和聚合分析。
kibana 是 Elasticsearch 的可视化平台，提供数据搜索、图表展示和仪表盘功能。

docker compose up  -d 
后台启动 Docker Compose 配置的所有服务。

访问kibana 的控制台
localhost:5601/app/home#/

http 请求方式测试下es

## Elastic Search 基本功能
es 索引相当于 Mysql 表
文档相当于mysql 里的一行
GET /   有返回启动成功了
GET /_cluster/health 显示green
查所有的索引 内置的索引
创建一个索引 
PUT /article 
{ 
  "mappings": { 
    "properties": { 
      "title": { 
        "type": "text" 
      }, 
      "content": { 
        "type": "text" 
        }, 
      "author": { 
        "type": "keyword" 
      }, 
      "createTime": { 
        "type": "date" 
      }, 
      "viewCount": { 
        "type": "integer" 
      } 
    } 
  } 
}

ES 创建 article 索引的映射定义：给文章字段规定类型，title 和 content 存全文可搜索文本，author 做精确匹配，createTime 识别日期，viewCount 存数字。

- 再查一下 GET /_cat/indices?v&s=index
- GET /article/_mapping 索引的结构
- 新增文档  索引名字后 _doc
  POST /article/_doc 
  { 
    "title": "Elasticsearch 全文检索入门", 
    "content": "ES 基于倒排索引与 BM25 实现全文搜索，适用于文本检索场景", 
    "author": "后端开发", 
    "createTime": "2026-04-26", 
    "viewCount": 128 
  }
  自动生成ID 
- 自定义ID 添加文档 
PUT /article/_doc/1001 
{ 
  "title": "RAG 混合检索实战", 
  "content": "ES 负责关键词检索，Milvus 负责向量语义检索，结合使用效果更佳", 
  "author": "AI开发", 
  "createTime": "2026-04-26", 
  "viewCount": 256 
  }

- 查单条
GET /article/_doc/1001
- 查询全部
GET /article/_search
- 全文检索
GET /article/_search
{
  "query": {
    "match": {
      "content": "RAG 向量 检索"
    }
  }
}

全文检索就是把 content 文本分词，找出包含 RAG、向量、检索这些词的文档，不是完全精准匹配整句话。

- 精确匹配查询
  GET /article/_search
  {
    "query": {
      "term": {
        "author": "AI开发"
      }
    }
  }

term 查询是**精确匹配**，不会分词，直接拿`AI开发`完整字符串，匹配 author（keyword 类型）字段里完全一样的值。

要点：

1. `term` 不会拆分词语，**必须一模一样**才能命中；
2. author 字段必须是`keyword`类型；
3. 适合作者名、标签这类需要完整精准比对的场景。

- 只返回指定字段
  GET /article/_search { "_source": ["title", "author"], "query": { "match_all": {} } }

- 分页 + 排序
  GET /article/_search { "from": 0, "size": 10, "sort": [ {"viewCount": "desc"} ], "query": { "match_all": {} } }

- 跟新文档 
POST /article/_update/1001 { "doc": { "viewCount": 999, "title": "RAG 混合检索高级实战" } }

- 全量覆盖更新
PUT /article/_doc/1001 { "title": "全量覆盖测试", "content": "原始内容被替换", "author": "测试用户", "createTime": "2026-04-26", "viewCount": 66 }

- 统计文档总数
GET /article/_count

- 条件删除
POST /article/_delete_by_query { "query": { "match": { "author": "后端开发" } } }


es 索引，文档增删改查 

es 比 mysql 有啥好处呢？
倒排索引的底层设计

普通 MySQL 使用的是正向索引：
以一行为单位存储完整数据，检索文本内容时，需要逐行遍历、逐个字段匹配内容。数据量越大、文本越长，模糊 / 全文搜索就越慢，性能极差，并不适合大范围关键词检索。
而 Elasticsearch 采用倒排索引机制：
会自动对 text 类型字段进行分词处理，拆解为一个个独立词条，再以「词条」为核心，反向关联所有包含该词条的文档。
简单来说：
正向索引：文档 → 关键词
倒排索引：关键词 → 文档
基于这种结构，用户输入关键词检索时，ES 只需通过词条快速匹配对应的文档，无需全表遍历，就能实现海量文本下毫秒级的全文检索。
综上，ES 倒排索引的底层架构，就是专门为海量文本、关键词模糊检索、内容匹配场景量身设计的，这也是它吊打 MySQL 全文搜索的根本原因。
理解了倒排索引，就理解了 ES 了。

显然，在 ES 里分词是很重要的，不同的分词建的索引表都不同。
es 默认的 standard 分词器对中文支持不好：


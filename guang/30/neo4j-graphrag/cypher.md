# Neo4j Cypher 语句实战：奶茶知识图谱

## 一、创建实体（节点）

### 1. 创建奶茶茶品类
CREATE (product:Product { name: "珍珠奶茶" })
CREATE (type1:Type { name: "台式奶茶" })
CREATE (type2:Type { name: "港式奶茶" })

### 2. 创建配料
CREATE (ing1: Ingredient { name: "珍珠" })
CREATE (ing2: Ingredient { name: "芋圆" })
CREATE (ing3: Ingredient { name: "果糖" })
CREATE (ing4: Ingredient { name: "红茶" })
CREATE (ing5: Ingredient { name: "牛奶" })

### 3. 创建制作工艺 & 适用人群
CREATE (method1: Method { name: "煮制" })
CREATE (method2: Method { name: "冲泡" })

CREATE (people1: People { name: "年轻人" })
CREATE (people2: People { name: "学生" })
CREATE (people3: People { name: "甜食爱好者" })

## 二、创建关系（知识图谱核心）
// 珍珠奶茶属于台湾奶茶
MATCH(p:Product {name:"珍珠奶茶"}), (t:Type {name: "台式奶茶"})
CREATE (p)-[:属于]->(t)

// 珍珠奶茶 包含 配料
MATCH(p:Product {name:"珍珠奶茶"}), (i:Ingredient {name: "珍珠"})
CREATE (p)-[:包含]->(i)

MATCH(p:Product {name:"珍珠奶茶"}), (i:Ingredient {name: "果糖"})
CREATE (p)-[:包含]->(i)

MATCH(p:Product {name:"珍珠奶茶"}), (i:Ingredient {name: "红茶"})
CREATE (p)-[:包含]->(i)

MATCH(p:Product {name:"珍珠奶茶"}), (i:Ingredient {name: "牛奶"})
CREATE (p)-[:包含]->(i)

MATCH(i:Ingredient {name:"珍珠"}), (m:Method {name: "煮制"})
CREATE (i)-[:使用]->(m)

MATCH(p:Product {name:"珍珠奶茶"}), (peo:People {name: "年轻人"})
CREATE (p)-[:适合]->(peo)

MATCH(p:Product {name:"珍珠奶茶"}), (peo:People {name: "学生"})
CREATE (p)-[:适合]->(peo)

MATCH(p:Product {name:"珍珠奶茶"}), (peo:People {name: "甜食爱好者"})
CREATE (p)-[:适合]->(peo)

## 三、查询验证
### 1. 查询全部节点与关系
MATCH (n)-[r]->(m)
RETURN n,r,m

### 2. 多跳关联词查询(GraphRAG能力)
// 查询：珍珠奶茶 -> 配料 ->制作工艺
MATCH(p:Product {name:"珍珠奶茶"})-[:包含]->(i)-[:使用]->(m)
RETURN p.name, i.name, m.name

// 查询奶茶适合那些人
MATCH (p:Product {name: "珍珠奶茶"})-[:适合]->(people)
RETURN p.name, people.name


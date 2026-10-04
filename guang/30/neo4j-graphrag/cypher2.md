1. 更新：给珍珠奶茶加热量属性
MATCH (p:Product {name:"珍珠奶茶"})
SET p.calorie = "中高热量", p.taste = "甜香"

2. 更新：修改珍珠工艺属性
MATCH (i:Ingredient {name:"珍珠"})
SET i.origin = "台湾", i.hard = "Q弹"

3. 只删除某一条关系
// 删除 珍珠奶茶 适合 学生 这条关系
MATCH (p:Product {name:"珍珠奶茶"})-[r:适合]->(s:People {name:"学生"})
DELETE r

4. 删除单个节点（无关联才可删）
MATCH (t:Type {name:"港式奶茶"})
DELETE t

5. 删除所有
MATCH (n)
DETACH DELETE n
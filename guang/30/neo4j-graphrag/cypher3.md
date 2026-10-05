// 创建节点：产品、品类、配料、工艺、人群
MERGE (product:Product { name: "珍珠奶茶" })
MERGE (type1:Type { name: "台式奶茶" })
MERGE (type2:Type { name: "港式奶茶" })

MERGE (ing1:Ingredient { name: "珍珠" })
MERGE (ing2:Ingredient { name: "芋圆" })
MERGE (ing3:Ingredient { name: "果糖" })
MERGE (ing4:Ingredient { name: "红茶" })
MERGE (ing5:Ingredient { name: "牛奶" })

MERGE (method1:Method { name: "煮制" })
MERGE (method2:Method { name: "冲泡" })

MERGE (people1:People { name: "年轻人" })
MERGE (people2:People { name: "学生" })
MERGE (people3:People { name: "甜食爱好者" })

// 创建关系
MERGE (product)-[:属于]->(type1)
MERGE (product)-[:包含]->(ing1)
MERGE (product)-[:包含]->(ing3)
MERGE (product)-[:包含]->(ing4)
MERGE (product)-[:包含]->(ing5)
MERGE (ing1)-[:使用]->(method1)
MERGE (product)-[:适合]->(people1)
MERGE (product)-[:适合]->(people2)
MERGE (product)-[:适合]->(people3);

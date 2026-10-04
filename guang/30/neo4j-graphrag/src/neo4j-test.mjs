import neo4j from 'neo4j-driver'

// 连接信息（和你的 docker-compose 完全一致）
const driver = neo4j.driver(
  'bolt://localhost:7687',
  neo4j.auth.basic('neo4j', '12345678')
)

// 获取会话
const session = driver.session()

// 1. 执行创建节点（示例）
async function createData() {
  const result = await session.run(`
    CREATE (p:Product {name: "珍珠奶茶"})
    CREATE (i:Ingredient {name: "珍珠"})
  `)
  console.log('创建成功')
}

// 2. 执行创建关系（示例）
async function createRelation() {
  await session.run(`
    MATCH (p:Product {name: "珍珠奶茶"}), (i:Ingredient {name: "珍珠"})
    CREATE (p)-[:包含]->(i)
  `)
  console.log('关系创建成功')
}

// 3. 查询数据
async function queryData() {
  const result = await session.run(`
    MATCH (p:Product {name: "珍珠奶茶"})-[r]->(i)
    RETURN p, r, i
  `)

  result.records.forEach(record => {
    console.log('奶茶:', record.get('p').properties.name)
    console.log('关系:', record.get('r').type)
    console.log('配料:', record.get('i').properties.name)
    console.log('--------------------------------')
  })
}

// 4. 更新属性
async function updateData() {
  await session.run(`
    MATCH (p:Product {name: "珍珠奶茶"})
    SET p.price = 15, p.calorie = "中高"
  `)
  console.log('更新成功')
}

// 5. 删除关系
async function deleteRelation() {
  await session.run(`
    MATCH (p:Product {name: "珍珠奶茶"})-[r:包含]->(i:Ingredient {name: "珍珠"})
    DELETE r
  `)
  console.log('删除关系成功')
}

// 6. 删除节点
async function deleteNode() {
  await session.run(`
    MATCH (p:Product {name: "珍珠奶茶"})
    DELETE p
  `)
  console.log('删除节点成功')
}

// 执行（你想运行哪个就打开哪个）
async function main() {
  try {
    await createData()
    // await createRelation()
    // await queryData()
    // await updateData()
    // await deleteRelation()
    // await deleteNode()
  } finally {
    await session.close() // 关会话
    await driver.close() // 关驱动，释放连接池
  }
}

main().catch(console.error)
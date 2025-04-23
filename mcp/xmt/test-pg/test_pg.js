const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:1234567890@127.0.0.1:5432/achievement'
});

client.connect()
  .then(() => client.query('SELECT * FROM score;'))
  .then(res => {
    console.log(res.rows); // 输出所有数据
    return client.end();
  })
  .catch(err => {
    console.error('查询失败:', err.message);
  });
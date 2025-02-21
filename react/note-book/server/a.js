const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '!Codingdream2021',
  authPlugins: {
    mysql_native_password: require('mysql2/lib/auth/mysql_native_password')
  }
});

connection.connect();

const mysql = require("mysql2/promise");
let connection;
module.exports = {
  async initDB() {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "380003982",
      database: "web07",
    });
  },
  getDB() {
    return connection;
  },
};

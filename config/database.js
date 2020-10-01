const db = require("../config/connection");

module.exports = {
  create_db: async (req, res) => {
    let sql = "CREATE DATABASE kopitaji";
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Database created..");
    });
  },
  create_user: async (req, res) => {
    let sql =
      "CREATE TABLE user(id_user int AUTO_INCREMENT, username VARCHAR(255), password VARCHAR(255), PRIMARY KEY(id_user))";
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Table created..");
    });
  },
};

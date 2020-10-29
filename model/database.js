const db = require("../config/connection");

module.exports = {
  create_db: (req, res) => {
    let sql = "CREATE DATABASE kopitaji";
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send("Database created..");
    });
  },
  create_user: (req, res) => {
    let sql =
      "CREATE TABLE user(id_user int AUTO_INCREMENT, username VARCHAR(255), password VARCHAR(255), PRIMARY KEY(id_user))";
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send("Table created..");
    });
  },
  create_alternatif: (req, res) => {
    let sql =
      "CREATE TABLE alternatif(id_alternatif int AUTO_INCREMENT, alternatif VARCHAR(255), kriteria_air FLOAT, kriteria_kotoran FLOAT, kriteria_serangga VARCHAR(255), kriteria_bau VARCHAR(255), PRIMARY KEY(id_alternatif))";
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send("Table created..");
    });
  },
};

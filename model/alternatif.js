const db = require("../config/connection");

module.exports = {
  select: (req, res) => {
    let sql = "SELECT * FROM alternatif";
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.json({ result });
    });
  },
  insert: (req, res) => {
    let sql = "INSERT INTO alternatif SET ?";
    db.query(sql, req.body, (err, result) => {
      if (err) throw err;
      res.json({ result });
    });
  },
  update: (req, res) => {
    let sql = `UPDATE alternatif SET ? WHERE id_alternatif = ${req.params.id}`;
    db.query(sql, req.body, (err, result) => {
      if (err) throw err;
      res.json({ result });
    });
  },
  destroy: (req, res) => {
    let sql = `DELETE FROM alternatif WHERE id_alternatif = ${req.params.id}`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.json({ result });
    });
  },
};

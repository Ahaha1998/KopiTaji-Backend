const db = require("../config/connection");
const jwt = require("jsonwebtoken");

module.exports = {
  insert: (req, res) => {
    let sql = "INSERT INTO user SET ?";
    db.query(sql, req.body, (err, result) => {
      if (err) throw err;
      res.json({ result });
    });
  },
  auth: (req, res) => {
    let sql = `SELECT * FROM user WHERE username = '${req.body.username}' AND password = '${req.body.password}'`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        let token = jwt.sign({ data: result }, `4haha1998`, {
          expiresIn: "1d",
        });
        res.json({ token, login: "Success" });
      } else {
        res.json({ token: null, login: "Failed" });
      }
    });
  },
};

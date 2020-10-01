const db = require("../config/connection");

module.exports = {
  insert: async (req, res) => {
    let sql = "INSERT INTO user SET ?";
    db.query(sql, req.body, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("User successfully added..");
    });
  },
};

const express = require("express");
const router = express.Router();
const auth = require("../config/auth");
const db = require("../config/connection");

const configTopsis = require("../method/config");
const preferenceConversion = require("../method/preferenceConversion");
const normalize = require("../method/normalize");
const topsis = require("../method/topsis/topsis");

router.get("/", (req, res) => {
  let sql =
    "SELECT kriteria_air, kriteria_kotoran, kriteria_serangga, kriteria_bau FROM alternatif";
  db.query(sql, (err, result) => {
    if (err) throw err;

    let alter = result.map((data) => {
      return Object.keys(data).map((key) => {
        return data[key];
      });
    });

    const decisionMatrix = preferenceConversion(alter, configTopsis.preference);
    const normalizedDecisionmatrix = normalize(decisionMatrix, {
      min: 1,
      max: 3,
    });

    const topsisResult = topsis(
      normalizedDecisionmatrix,
      configTopsis.weight,
      configTopsis.isBenefit
    );

    const response = {
      decisionMatrix,
      normalizedDecisionmatrix,
      ...topsisResult,
    };
    console.log(normalizedDecisionmatrix);
    return res.json(response);
  });
});

module.exports = router;

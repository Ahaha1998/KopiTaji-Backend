const express = require("express");
const router = express.Router();
const auth = require("../config/auth");
const db = require("../config/connection");

const configMoora = require("../method/config");
const preferenceConversion = require("../method/preferenceConversion");
const normalize = require("../method/normalize");
const moora = require("../method/moora/moora");

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

    const decisionMatrix = preferenceConversion(alter, configMoora.preference);
    const normalizedDecisionmatrix = normalize(decisionMatrix, {
      min: 1,
      max: 3,
    });

    const mooraResult = moora(
      normalizedDecisionmatrix,
      configMoora.weight,
      configMoora.isBenefit
    );
    const response = {
      decisionMatrix,
      normalizedDecisionmatrix,
      ...mooraResult,
    };
    return res.json(response);
  });
});

module.exports = router;

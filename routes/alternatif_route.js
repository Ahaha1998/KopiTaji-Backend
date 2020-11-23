const express = require("express");
const router = express.Router();
const auth = require("../config/auth");

const { select, insert, update, destroy } = require("../model/alternatif");

router.get("/", select);
router.post("/", insert);
router.put("/:id", auth, update);
router.delete("/:id", auth, destroy);

module.exports = router;

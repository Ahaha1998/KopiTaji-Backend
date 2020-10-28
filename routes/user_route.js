const express = require("express");
const router = express.Router();

const { insert, auth } = require("../model/user");

router.get("/", auth);
router.post("/", insert);

module.exports = router;

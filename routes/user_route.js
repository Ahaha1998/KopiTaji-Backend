const express = require("express");
const router = express.Router();

const { insert, auth } = require("../model/user");

router.post("/login", auth);
router.post("/", insert);

module.exports = router;

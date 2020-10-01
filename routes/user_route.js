const express = require("express");
const router = express.Router();

const { insert } = require("../model/user");

router.post("/", insert);

module.exports = router;

const express = require("express");
const router = express.Router();

const { create_user } = require("../config/database");

router.get("/", create_user);

module.exports = router;

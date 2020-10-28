const express = require("express");
const router = express.Router();

const { create_user, create_alternatif } = require("../config/database");

router.get("/table_user", create_user);
router.get("/table_alternatif", create_alternatif)

module.exports = router;

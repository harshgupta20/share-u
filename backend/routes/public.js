const express = require("express");
const Public = require("../app/modules/public");
const router = express.Router();

router.get("/username", new Public().getUsernameData);

module.exports= router;

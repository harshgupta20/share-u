const express = require("express");
const Auth= require("../app/modules/auth");
const router = express.Router();

router.post("/login", new Auth().loginUser);
router.post("/register", new Auth().registerUser);
router.post("/loginWithOTP", new Auth().loginWithOTP);
router.post("/verifyOTP", new Auth().verifyOTP);

module.exports= router;
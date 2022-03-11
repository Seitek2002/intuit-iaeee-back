const express = require("express");
const AuthController = require("../controller/auth.controller");
const router = new express();

router.post("/registration", AuthController.registration_post);

module.exports = router;

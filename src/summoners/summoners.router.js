const express = require("express");
const router = express.Router();
const SummonersController = require("./summoners.controller");

router.get("/", SummonersController.getSummoner);

module.exports = router;

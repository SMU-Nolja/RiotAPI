const express = require("express");
const router = express.Router();
const SummonersController = require("./summoners.controller");

router.get("/", SummonersController.getPage);
router.get("/info", SummonersController.getSummoner);
router.get("/match", SummonersController.getMatch);

module.exports = router;

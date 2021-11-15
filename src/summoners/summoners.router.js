const express = require("express");
const router = express.Router();
const SummonersController = require("./summoners.controller");

router.get("/", SummonersController.getMainPage);
router.get("/info", SummonersController.getInfoPage);
router.get("/info/summonerInfo", SummonersController.getSummoner);
router.get("/match", SummonersController.getMatch);

module.exports = router;

const express = require("express");
const router = express.Router();
const SummonersController = require("./summoners.controller");

router.get("/", SummonersController.getMainPage);
router.get("/info", SummonersController.getInfoPage);
router.get("/info/summonerInfo", SummonersController.getSummoner);
router.get("/info/matchInfo", SummonersController.getMatchInfo);
router.get("/info/currentGameInfo", SummonersController.getCurrentGameInfo);

module.exports = router;

const express = require("express");
const router = express.Router();
const SummonersController = require("./summoners.controller");

router.get("/", SummonersController.getPage);
router.get("/info", SummonersController.getSummoner);

module.exports = router;

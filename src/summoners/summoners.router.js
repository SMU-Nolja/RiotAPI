const express = require("express");
const router = express.Router();
const SummonersController = require("./summoners.controller");

router.get("/", SummonersController.getSummoner);
router.get("/nickname", SummonersController.getPage);
router.post("/nickname", SummonersController.getSummoner);

module.exports = router;

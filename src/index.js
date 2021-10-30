const express = require("express");

const router = express.Router();

const summonerRouter = require("./summoners/summoners.router");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

router.use("/summoners", summonerRouter);

module.exports = router;

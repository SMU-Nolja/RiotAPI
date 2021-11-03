const dotenv = require("dotenv");
const axios = require("axios");
const summonerService = require("./summoners.service");
const summonerCommon = require("./summoners.common");
const path = require("path");

dotenv.config();

class SummonersController {
    constructor(summonerService) {
        this.service = summonerService;
    }

    getSummoner = async (req, res, next) => {
        const { nickname } = req.body;

        const puuid = await summonerCommon.getPuuid(nickname);

        // DB에 없으면 Summeoner 추가
        if (puuid !== await this.service.findPuuid(nickname)) {
            await summonerCommon.putSummoner(nickname);
        }

        console.log(puuid);

        const matchUrl = `${
            process.env.ASIA_BASE_URL
        }/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${
            process.env.API_KEY
        }`;

        const matchData = await axios.get(matchUrl);
    };

    getPage = async(req, res, next) => {
        res.sendFile(path.join(__dirname, "../public/username.html"));
    };
}
module.exports = new SummonersController(summonerService);

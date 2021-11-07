const dotenv = require("dotenv");
const axios = require("axios");
const summonerService = require("./summoners.service");
const path = require("path");

dotenv.config();

class SummonersController {
    constructor(summonerService) {
        this.service = summonerService;
    }

    getSummoner = async (req, res, next) => {
        const { nickname } = req.query;

        console.log(nickname);
        const url = `${
            process.env.KOREA_BASE_URL
        }/lol/summoner/v4/summoners/by-name/${encodeURI(nickname)}?api_key=${
            process.env.API_KEY
        }`;

        const { data } = await axios.get(url);

        const findedPuuid = await this.service.findPuuid(nickname);

        // DB에 없으면 Summeoner 추가
        if (!findedPuuid) {
            const url = `${
                process.env.KOREA_BASE_URL
            }/lol/summoner/v4/summoners/by-name/${encodeURI(
                nickname
            )}?api_key=${process.env.API_KEY}`;

            const { data } = await axios.get(url);

            await this.service.insertSummoner(
                data.name,
                data.puuid,
                data.accountId,
                data.id
            );
        }

        res.json(data);
    };

    getPage = async (req, res, next) => {
        res.sendFile(path.join(__dirname, "../public/username.html"));
    };

    getMatch = async (req, res, next) => {
        const matchUrl = `${process.env.ASIA_BASE_URL}
        /lol/match/v5/matches/by-puuid/${puuid}
        /ids?start=0&count=20&api_key=${process.env.API_KEY}`;

        const matchData = await axios.get(matchUrl);
    };
}
module.exports = new SummonersController(summonerService);

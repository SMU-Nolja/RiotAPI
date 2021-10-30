const dotenv = require("dotenv");
const axios = require("axios");
const summonerService = require("./summoners.service");

dotenv.config();

class SummonersController {
    constructor(summonerService) {
        this.service = summonerService;
    }

    getSummoner = async (req, res, next) => {
        const { nickname } = req.body;

        const url = `${
            process.env.BASE_URL
        }/lol/summoner/v4/summoners/by-name/${encodeURI(nickname)}?api_key=${
            process.env.API_KEY
        }`;

        const { data } = await axios.get(url);

        this.service.insertSummoner(
            data.name,
            data.puuid,
            data.accountId,
            data.id
        );

        console.log(data);
        res.send(data);
    };
}

module.exports = new SummonersController(summonerService);

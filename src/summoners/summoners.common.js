/*
    API에 URL을 넘김
*/

const dotenv = require("dotenv");
const axios = require("axios");
const summonerService = require("./summoners.service");
const path = require("path");

dotenv.config();

class SummonersCommon {
    constructor(summonerService) {
        this.service = summonerService;
    }

    putSummoner = async(nickname) => {
        const url = `${
            process.env.KOREA_BASE_URL
        }/lol/summoner/v4/summoners/by-name/${encodeURI(nickname)}?api_key=${
            process.env.API_KEY
        }`;

        const { data } = await axios.get(url);
        
        await this.service.insertSummoner(
            data.name,
            data.puuid,
            data.accountId,
            data.id
        );
    };

    getPuuid = async(nickname) => {
        const url = `${
            process.env.KOREA_BASE_URL
        }/lol/summoner/v4/summoners/by-name/${encodeURI(nickname)}?api_key=${
            process.env.API_KEY
        }`;

        const { data } = await axios.get(url);
        const puuid = data.puuid;

        return puuid;
    };

    // const matchUrl = `${
    //     process.env.ASIA_BASE_URL
    // }/lol/match/v5/matches/by-puuid/${data.puuid}/ids?start=0&count=20&api_key=${
    //     process.env.API_KEY
    // }`;

}
module.exports = new SummonersCommon(summonerService);

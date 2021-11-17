const dotenv = require("dotenv");
const axios = require("axios");
const summonerService = require("./summoners.service");
const path = require("path");
const common = require("../common/common");

dotenv.config();

class SummonersController {
    constructor(summonerService) {
        this.service = summonerService;
    }

    //메인 페이지
    getMainPage = async (req, res, next) => {
        res.sendFile(path.join(__dirname, "../public/main.html"));
    };

    getInfoPage = async (req, res, next) => {
        res.sendFile(path.join(__dirname + "/../public/info.html"));
    };
    getSummoner = async (req, res, next) => {
        const { nickname } = req.query;

        // DB에 없으면 Summoner 추가 후 API 조회 결과 return
        const findedPuuid = await this.service.findPuuid(nickname);

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

            return res.json(data);
        }

        // 있으면 DB에서 뽑아옴
        const data = await this.service.findSummoner(nickname);
        res.json(data);
    };

    
    getMatchInfo = async (req, res, next) => {
        const temp = await this.getMatchId(req, res, next);
        const matchId = temp.data;
        
        console.log(matchId);

        for (const id of matchId) {
            const matchUrl = `${process.env.ASIA_BASE_URL}/lol/match/v5/matches/${id}?api_key=${process.env.API_KEY}`;
            
            const matchInfo = await axios.get(matchUrl);

            const duration = matchInfo.data.info.gameDuration
            const temp = matchInfo.data.info.gameEndTimestamp;
            let endTime = new Date(temp);
            endTime = common.toMysqlFormat(endTime);
            console.log(endTime);

            const findedMatchId = await this.service.findMatchId(id)
            if (!findedMatchId) {
                await this.service.insertMatchInfo(id, duration, endTime);
            }
        }
    }

    getMatchId = async (req, res, next) => {
        const { nickname } = req.query;
        const temp = await this.service.findPuuid(nickname);
        const puuid = temp.puuid;
        const matchUrl = `${process.env.ASIA_BASE_URL}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${process.env.API_KEY}`;
    
        const matchId = await axios.get(matchUrl);
        return matchId;
    };
}
module.exports = new SummonersController(summonerService);

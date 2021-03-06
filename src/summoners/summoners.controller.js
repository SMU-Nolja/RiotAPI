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
        const foundPuuid = await this.service.findPuuidByNickname(nickname);

        if (!foundPuuid) {
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
        const data = await this.service.findSummonerByNickname(nickname);
        return res.json(data);
    };

    getMatchInfo = async (req, res, next) => {
        await this.updateMatchInfo(req, res, next);

        const { nickname } = req.query;
        const data = [];

        const matchIds = await this.service.findMatchIdsByNickname(nickname);

        for (const id of matchIds) {
            const matchInfo = await this.service.findMatchInfoByMatchId(
                id.match_id
            );
            const participantInfo =
                await this.service.findParticipantsByMatchId(id.match_id);
            data.push({ matchInfo, participantInfo });
        }

        return res.json(data);
    };

    getCurrentGameInfo = async (req, res, next) => {
        const { nickname } = req.query;
        const temp = await this.service.findSummonerIdByNickname(nickname);
        const summonerId = temp.LOL_ID;

        const url = `${process.env.KOREA_BASE_URL}/lol/spectator/v4/active-games/by-summoner/${summonerId}?api_key=${process.env.API_KEY}`;

        const currentGameInfo = await axios.get(url);

        const gameStartTime = currentGameInfo.data.gameStartTime;
        const gameLength = currentGameInfo.data.gameLength;
        const bannedChampions = currentGameInfo.data.bannedChampions;
        const participants = currentGameInfo.data.participants;

        for (const participant of participants) {
            const temp = await this.service.findChampionNameByChampionId(
                participant.championId
            );
            participant.championName = temp.champion_name;
        }

        const data = {
            gameStartTime,
            gameLength,
            bannedChampions,
            participants,
        };

        return res.json(data);
    };

    updateMatchInfo = async (req, res, next) => {
        const { nickname } = req.query;
        let temp = await this.service.findPuuidByNickname(nickname);
        const puuid = temp.puuid;
        const matchUrl = `${process.env.ASIA_BASE_URL}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${process.env.API_KEY}`;

        temp = await axios.get(matchUrl);
        const matchId = temp.data;

        for (const id of matchId) {
            // DB에 matchId 없으면 경기 정보 추가
            const foundMatchId = await this.service.findMatchId(id);

            if (!foundMatchId) {
                const matchUrl = `${process.env.ASIA_BASE_URL}/lol/match/v5/matches/${id}?api_key=${process.env.API_KEY}`;

                const matchInfo = await axios.get(matchUrl);

                const duration = matchInfo.data.info.gameDuration;
                const temp = matchInfo.data.info.gameEndTimestamp;
                let endTime = new Date(temp);
                endTime = common.toMysqlFormat(endTime);

                await this.service.insertMatchInfo(id, duration, endTime);

                const participants = matchInfo.data.info.participants;

                for (const participant of participants) {
                    const puuid = participant.puuid;
                    const summonerName = participant.summonerName;
                    const championId = participant.championId;
                    const championLevel = participant.champLevel;
                    const kills = participant.kills;
                    const deaths = participant.deaths;
                    const assists = participant.assists;

                    const totalMinionKilled = participant.totalMinionsKilled;

                    await this.service.insertParticipant(
                        puuid,
                        summonerName,
                        championId,
                        championLevel,
                        kills,
                        deaths,
                        assists,
                        totalMinionKilled,
                        id
                    );
                }
            }
        }
    };
}
module.exports = new SummonersController(summonerService);

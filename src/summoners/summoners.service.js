const pool = require("../database/db");

class SummonersService {
    insertSummoner = async (name, puuid, accountId, lolId) => {
        const sql = `INSERT INTO LOL_USER (NAME, PUUID, ACCOUNT_ID, LOL_ID) VALUES ('${name}', '${puuid}', '${accountId}', '${lolId}')`;
        await pool.query(sql);
    };

    findPuuid = async (nickname) => {
        const sql = `SELECT puuid FROM LOL_USER WHERE NAME = '${nickname}' limit 1`;
        const [[result]] = await pool.query(sql);

        return result;
    };

    findSummonerId = async (nickname) => {
        const sql = `SELECT LOL_ID FROM LOL_USER WHERE NAME = '${nickname}' limit 1`;
        const [[result]] = await pool.query(sql);

        return result;
    };

    findSummoner = async (nickname) => {
        const sql = `SELECT * FROM LOL_USER WHERE NAME = '${nickname}' limit 1`;
        const [[result]] = await pool.query(sql);

        return result;
    };

    insertMatchInfo = async (matchId, duration, endTime) => {
        const sql = `INSERT INTO matches(match_id, game_duration, end_time_stamp) VALUES ('${matchId}', ${duration}, '${endTime}')`;
        await pool.query(sql);
    };

    findMatchId = async (matchId) => {
        const sql = `SELECT match_id from matches WHERE match_id = '${matchId}' limit 1`;
        const [[result]] = await pool.query(sql);

        return result;
    };

    findMatchInfo = async (matchId) => {
        const sql = `SELECT * from matches WHERE match_id = '${matchId}' limit 1`;
        const [[result]] = await pool.query(sql);

        return result;
    };

    insertParticipant = async (
        puuid,
        summonerName,
        championId,
        championLevel,
        kills,
        deaths,
        assists,
        totalMinionKilled,
        matchId
    ) => {
        const sql = `INSERT INTO participants(puuid, summoner_name, champion_id, champion_level, kills, deaths, assists, total_minion_killed, match_id) 
                    VALUES('${puuid}', '${summonerName}', '${championId}', ${championLevel}, ${kills}, ${deaths}, ${assists}, ${totalMinionKilled}, '${matchId}')`;
        await pool.query(sql);
    };

    findParticipant = async (matchId) => {
        const sql = `SELECT * FROM participants natural join champions WHERE match_id = '${matchId}'`;
        const [result] = await pool.query(sql);

        return result;
    };
}

module.exports = new SummonersService();

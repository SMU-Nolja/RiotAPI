const pool = require("../database/db");

class SummonersService {
    insertSummoner = async (name, puuid, accountId, lolId) => {
        const sql = `INSERT INTO LOL_USER (NAME, PUUID, ACCOUNT_ID, LOL_ID) VALUES ('${name}', '${puuid}', '${accountId}', '${lolId}')`;
        await pool.query(sql);
    };

    findPuuid = async (nickname) => {
        const sql = `SELECT puuid FROM LOL_USER WHERE NAME = "${nickname}"`;

        const [[result]] = await pool.query(sql);

        return result;
    };

    findSummoner = async (nickname) => {
        const sql = `SELECT * FROM LOL_USER WHERE NAME = "${nickname}"`;

        const [[result]] = await pool.query(sql);
        console.log(result);
        return result;
    }
}

module.exports = new SummonersService();

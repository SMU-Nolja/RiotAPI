const connection = require("../database/db");

class SummonersService {
    insertSummoner = async (name, puuid, accountId, lolId) => {
        const sql = `INSERT INTO LOL_USER (NAME, PUUID, ACCOUNT_ID, LOL_ID) VALUES ('${name}', '${puuid}', '${accountId}', '${lolId}')`;
        connection.query(sql);
    };

    findPuuid = async (name) => {
        const sql = `SELECT PUUID FROM LOL_USER WHERE NAME = "${name}"`;

        console.log(sql);

        connection.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            return rows[0];
        });

        return null;
    }
}

module.exports = new SummonersService();

const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

module.exports = (function () {
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        connectionLimit: 8,
        dateStrings: "date",
    });

    return pool;
})();

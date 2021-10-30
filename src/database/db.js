const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

module.exports = (function () {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    });

    connection.connect();

    return connection;
})();
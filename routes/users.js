const express = require('express');
const axios = require('axios');
const router = express.Router();
const mysql  = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const connnection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

const baseUrl = "https://kr.api.riotgames.com";

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const nickname = "어시가짜다원딜아";
  const url = baseUrl + "/lol/summoner/v4/summoners/by-name/" +
              encodeURI(nickname) + "?api_key=" + process.env.API_KEY;
  const { data } = await axios.get(url);
  console.log(data);
  res.send(data);
});

module.exports = router;

require('dotenv').config();
const request = require('request');
const express = require('express');

const router = express.Router();
const { CLIENT_ID, CLIENT_SECRET } = process.env;

const host = 'openapi.naver.com';
const headers = {
  Accept: '*/*',
  'X-Naver-Client-Id': CLIENT_ID,
  'X-Naver-Client-Secret': CLIENT_SECRET,
};

const queryString = {
  display: 10,
  start: 1,
  // genre: 1,
};

router.get('/', (req, res) => {
  queryString.query = req.query.keyword;
  request({
    url: `https://${host}/v1/search/movie.json`,
    qs: queryString,
    headers,
    json: true,
  }, (error, response, body) => {
    console.log('body', body);
    res.json(body);
  });
});

module.exports = router;

'use strict';

var express = require('express');
var router = express.Router();

const nlu = require('../lib/nlu');

const features = {
  keywords: {},
  concepts: {},
  sentiment: {},
  entities: {
    // model: 'en-us-tir'
  },
  emotion: {},
  syntax: {
    tokens: {
      lemma: true,
      part_of_speech: true
    }
  }
}

router.get('/test', async function(req, res, next) {
  let response = await nlu.analyze(req.query.text, features).catch((err) => {
    console.log(`Error caught for /test: ${err}`);
  });
  res.json(response);
});

router.post('/fileUpload', async function(req, res, next) {
  let response = await nlu.analyze(req.files.file.data.toString('utf8'), features).catch((err) => {
    console.log(`Error caught while performing /fileUpload call: ${err}`);
  });
  res.json(response);
});

router.get('/analyzeURL', async function(req, res, next) {
  let response = await nlu.analyze_url(req.query.url, features).catch((err) => {
    console.log(`Error caught while performing /analyzeURL call: ${err}`);
  });
  res.json(response);
});

module.exports = router;

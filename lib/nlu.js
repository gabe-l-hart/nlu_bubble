'use strict';

const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
const creds = require('../config/nlu_creds.json');

const nlu = new NaturalLanguageUnderstandingV1({
  username: creds.username,
  password: creds.password,
  version_date: '2018-11-16',
  url: creds.url
});

const response_handler = (resolve, reject) => {
  return (err, response) => {
    if (err) {
      reject(err);
    } else {

      // Add some useful statistics about the response
      if (response) {
        const responseStats = {};
        if (response.entities) {
          responseStats.entities_count = response.entities.length;
        }
        if (response.sentiment) {
          responseStats.sentiment_type = response.sentiment.document.label;
        }
        if (response.keywords) {
          responseStats.keywords_count = response.keywords.length;
        }
        if (response.emotion) {
          const emotion = response.emotion.document.emotion;
          responseStats.strongest_emotion = Object.keys(emotion).reduce((a, b) => emotion[a] > emotion[b] ? a : b);
        }
        console.log(`Response Info: ${JSON.stringify(responseStats, null, 2)}`);
      }
      resolve(response);
    }
  }
}

const analyze = (fileData, features) => {
  console.log(`NLU Request: ${JSON.stringify(features, null, 2)}`);
  return new Promise((resolve, reject) => {
    nlu.analyze(
      {
        text: fileData,
        features: features
      }, response_handler(resolve, reject)
    );
  });
}

const analyze_url = (url, features) => {
  console.log(`NLU Request: ${JSON.stringify(features, null, 2)}`);
  return new Promise((resolve, reject) => {
    nlu.analyze(
      {
        url,
        features: features
      }, response_handler(resolve, reject)
    );
  });
}

module.exports = { analyze, analyze_url }

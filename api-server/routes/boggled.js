var express = require('express');
var router = express.Router();
var parseScoringWords = require('../services/boggle_solver');

/* POST to calculate scoring boggle words */
router.post('/', function(req, res, next) {
  var scoringWords = parseScoringWords(req.body);
  res.send(scoringWords);
});

module.exports = router;

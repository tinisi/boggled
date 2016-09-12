
var boggLib = require('bogglib').default;

var parseScoringWords = function(matrix) {
  var possibleWords = boggLib.possibleWords(matrix);
  return boggLib.scoringWords(possibleWords);
}

module.exports = parseScoringWords;

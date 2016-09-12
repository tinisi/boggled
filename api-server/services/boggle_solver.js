
var boggLib = require('boggLib').default;

var parseScoringWords = function(matrix) {
  console.log(matrix);
  return boggLib.scoringWords();
}

module.exports = parseScoringWords;

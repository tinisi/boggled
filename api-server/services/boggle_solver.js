
var BoggLib = require('bogglib').default;

var parseScoringWords = function(data) {
  var results;
  var matrix = data.matrix;
  var boardSize = parseInt(data.boardSize, 10) || 4;
  var minWordLength = parseInt(data.minWordLength, 10) | 3;
  console.log(boardSize, minWordLength);
  console.log(matrix);
  var boggLib = new BoggLib(boardSize, minWordLength);
  var err = boggLib.initMatrix(matrix);
  if ( err ) {
    results = { error: err.message };
  } else {
    results = boggLib.scoringWords();
  }
  return results
}

module.exports = parseScoringWords;

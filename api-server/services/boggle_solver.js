
var BoggLib = require('bogglib').default;

var parseScoringWords = function(data) {
  var results;
  var matrix = data.matrix;
  var boardSize = parseInt(data.boardSize, 10) || 4;
  var minWordLength = parseInt(data.minWordLength, 10) | 3;
  var boggLib = new BoggLib(boardSize, minWordLength);
  var err = boggLib.initMatrix(matrix);
  if ( err ) {
    console.log(err.message);
    // I left such a nerdy error message in the library!
    // I can assume the only error coming from initMatrix() will be mine,
    // changing it here for usability...
    results = {
      error: 'Sorry! Your Boggle board is invalid. It should have ' +
        boardSize + ' lines, with ' +
        boardSize + ' letters in each line.'
      };
  } else {
    results = boggLib.scoringWords();
  }
  return results
}

module.exports = parseScoringWords;

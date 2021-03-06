
class BoggleForm {

  constructor() {
    this.parentEl = undefined;
  }

  renderInto(parentEl) {
    this.parentEl = parentEl;
    // TODO: Would be cool to being all the parts for this component
    // into same folder, but would require changes to webpack config...
    // Heh, also my folder names would no longer be semantic (this is in resources/js/components),
    // so will put this off for now.
    let formHTML = require('../../../partials/boggle_form.html');
    this.parentEl.innerHTML = formHTML;
    // get the root element (this is in the templates we just loaded);
    this.root = this.parentEl.querySelector('#app');
    this.goButton = this.parentEl.querySelector('#get-scoring-words');
    this.boggleBoard = this.parentEl.querySelector('#boggle-board');
    this.boardSizeField = this.parentEl.querySelector('#board-size');
    this.minWordLengthField = this.parentEl.querySelector('#min-word-length');
    this.scoringWordsContainer = this.parentEl.querySelector('#scoring-words');

    // get some css for this components (ditto here, ideally this would be in same folder)
    require('../../styles/boogle_form.css');

    // set up a listener to fire the xhr request
    let self = this;
    let goHandler = function(e) {
      self.sendBoggleBoardToServer(self.boggleBoard.value, self.boardSizeField.value, self.minWordLengthField.value);
    }
    this.goButton.addEventListener('click', goHandler);

    let focusHandler = function(e) {
      let classes = e.target.classList;
      classes.remove('board');
      classes.add('focused-board');
    }
    this.boggleBoard.addEventListener('focus', focusHandler);

    let blurHandler = function(e) {
      let classes = e.target.classList;
      classes.remove('focused-board');
      classes.add('board');
    }
    this.boggleBoard.addEventListener('blur', blurHandler);

  }

  sendBoggleBoardToServer(board, boardSize, minWordLength) {

    // this will be empty string for prod, http://localhost:3000 for dev
    // TODO: having issues in tests with this, it is defined by
    // webpack, which is NOT in pipeline when running jasmin specs
    const apiUrl = boggled.env.API_URL;

    boardSize = boardSize || 4;
    minWordLength = minWordLength || 3;

    this.goButton.disabled = true;
    this.scoringWordsContainer.innerHTML = 'Please wait, request is being processed on the server...';

    let self = this;
    fetch(apiUrl + '/api/parse_scoring_words', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          boardSize,
          minWordLength,
          matrix: parseTextArea(board)
        })
      })
      .then(function(response) {
        return response.text()
      }).then(function(body) {
        console.log(body);
        self.goButton.disabled = false;
        let parsedBody = JSON.parse(body);
        self.displayResults(parsedBody);
      });
  }

  displayResults(results) {
    // first wipe out whatever was in there
    this.scoringWordsContainer.innerHTML = '';
    // we might get a validation error back from the server as a string
    // so if the results are NOT an array, we'll assume it is an error message
    if ( results.error ) {
      this.scoringWordsContainer.innerHTML = results.error;
    } else {
      // if there are any scoring words, display them
      if ( results.length ) {
        let list = document.createElement('ul');
        for ( let word of results ) {
          let item = document.createElement('li');
          item.innerHTML = word;
          list.appendChild(item);
        }
        this.scoringWordsContainer.appendChild(list);  
      } else {
        this.scoringWordsContainer.innerHTML = 'No scoring words found!';
      }
    }   
  }

}

// private helpers

// this will turn the multiline free text area
// into an array of arrays, ready to be sent to server
function parseTextArea(text) {
  let matrix = [];
  let lines = text.trim().split(/[\r\n]/gm);
  for ( let line of lines ) {
    // remove all other whitespace
    let cleanedLine = line.replace(/\s/g, '');
    let chars = [...cleanedLine];
    matrix.push(chars);
  }
  return matrix;
}

export default BoggleForm;

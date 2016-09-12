
class App {

  init() {
    var formHTML = require('../../partials/boggle_form.html');
    document.body.innerHTML = formHTML;
    // get the root element (this is in the templates we just loaded);
    this.root = document.querySelector('#app');
    this.goButton = document.querySelector('#get-scoring-words');
    this.boggleBoard = document.querySelector('#boggle-board');
    // get some css
    require('../styles/app.css');
    // set up a listener to do something interesting
    let self = this;
    let goHandler = function(e) {
      self.sendBoggleBoardToServer(self.boggleBoard.value);
    }
    this.goButton.addEventListener('click', goHandler);
  }

  sendBoggleBoardToServer(board) {

    // this will be empty string for prod, http://localhost:3000 for dev
    // TODO: having issues in tests with this, it is defined by
    // webpack, which is NOT in pipeline when running jasmin specs
    const apiUrl = boggled.env.API_URL;

    console.log('contents of textarea: ', board);
    fetch(apiUrl + '/api/parse_scoring_words', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([['A','B','C'],['A','B','C'],['A','B','C']])
      })
      .then(function(response) {
        console.log('raw response from server: ', response);
        return response.text()
      }).then(function(body) {
        console.log('body: ', body);
      });
  }

}

export default App;

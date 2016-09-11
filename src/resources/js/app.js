
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
    console.log('contents of textarea: ', board);
    fetch('/api/users')
      .then(function(response) {
        console.log('raw response from server: ', response);
        return response.text()
      }).then(function(body) {
        console.log('body: ', body);
      });
  }

}

export default App;

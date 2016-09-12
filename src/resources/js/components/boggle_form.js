
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

    // get some css for this components (ditto here, ideally this would be in same folder)
    require('../../styles/boogle_form.css');

    // set up a listener to fire the xhr request
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

export default BoggleForm;

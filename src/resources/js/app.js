
class App {

  init() {
    var formHTML = require('../../partials/boggle_form.html');
    document.body.innerHTML = formHTML;
    // get the root element (this is in the templates we just loaded);
    this.root = document.querySelector('#app');
    // get some css
    require('../styles/app.css');
    // // set up a listener to do something interesting
    // let self = this;
    // let goHandler = function(e) {
    //   self.printAwesomeMessage(self.textField.value);
    // }
    // this.goButton.addEventListener('click', goHandler);
  }

  printAwesomeMessage(msg) {
    // let awesomeMessage = awesome(msg);
    // this.messageContainer.textContent = awesomeMessage;
  }

}

export default App;

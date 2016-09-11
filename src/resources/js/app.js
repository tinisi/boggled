
class App {

  init() {
    var bodyContents = require('../../partials/body.ejs')();
    document.body.innerHTML = bodyContents;
    // get the root element (this is in the templates we just loaded);
    this.root = document.querySelector('#app');
    // get some css
    require('../styles/app.css');
    // make some elements
    this.messageContainer = document.createElement('div');
    this.goButton = document.createElement('button');
    this.textField = document.createElement('input');
    this.textField.type = 'text';
    this.goButton.textContent = 'Do It';
    // render them
    this.root.appendChild(this.textField);
    this.root.appendChild(this.goButton);
    this.root.appendChild(this.messageContainer);
    // set up a listener to do something interesting
    let self = this;
    let goHandler = function(e) {
      self.printAwesomeMessage(self.textField.value);
    }
    this.goButton.addEventListener('click', goHandler);
  }

  printAwesomeMessage(msg) {
    // let awesomeMessage = awesome(msg);
    // this.messageContainer.textContent = awesomeMessage;
  }

}

export default App;

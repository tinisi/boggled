import BoggleForm from './components/boggle_form';

class App {

  init() {
    // get some css for the whole app
    require('../styles/app.css');
    let boggleForm = new BoggleForm();
    this.root = document.querySelector('#app');
    boggleForm.renderInto(this.root);
  }

}

export default App;

import React, { Component } from 'react';
import '../components-css/App.css';
import Map from './Map'
import TopBar from './TopBar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopBar />
        <Map/>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Login from './LoginLogout/Login';
import './Global.css';


class App extends Component {  
  render() {
    return (
      <div className="App">
        <div id="CenterBox">
        <Login   />
        </div>
	       <div id = "authorshipV2"> <p>Created by Norman Potts </p> </div>
      </div>
    );
  }
}

export default App;

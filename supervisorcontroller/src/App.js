import React, { Component } from 'react';

import Login from './LoginLogout/Login';
import './CSS/Global.css';


class App extends Component {
  constructor(props, context) {
     super(props, context);     
     this.tryLogin = this.tryLogin.bind(this);
   }
   tryLogin(){
		console.log(" Trying login. ");
   }
  render() {    
    return (
     <div className="App">
      <div id="CenterBox">        
		<Login tryLogin = {this.tryLogin}  />
      </div>
      <div id = "authorshipV2"> <p>Created by Norman Potts </p> </div>
     </div>
    );
  }
}

export default App;

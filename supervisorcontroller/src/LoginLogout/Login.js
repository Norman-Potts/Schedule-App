import React, { Component } from 'react';
import './loginlogout.css';


class Login extends Component {
  constructor(props, context) {
     super(props, context);
     this.tryLogin = this.tryLogin.bind(this);

  }
  tryLogin() {
    this.props.tryLogin();
  }
  render() {
    return (
      <div id = "loginParentBox">
          <h1>Supervisor Controller for Schedule App </h1>
      		<h2> Please login below</h2>
          <div id="myLoginForm" >

          <div>
            <p>
            Supervisor ID:<input type="text" name="SupervisorID"  maxLength="4"  autoFocus></input>
            </p>

            <p>
            Supervisor Username: <input type="text" name="Username"  maxLength="42"  ></input>
            </p>
            <p>
            Password:	<input type="password" name ="password"  maxLength="20"></input>
            </p>
          </div>

            <p><button  id = "loginbutton" onClick = {this.tryLogin} >Login</button></p>
            <p><button  id = "help">Help</button></p>
          </div>

      </div>
    );
  }
}

export default Login;

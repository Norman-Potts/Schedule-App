import React, { Component } from 'react';
import Helpmodal from './Helpmodal';
import './loginlogout.css';


class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.tryLogin = this.tryLogin.bind(this);
    this.UsernameChange = this.UsernameChange.bind(this);
    this.PasswordChange = this.PasswordChange.bind(this);
	  this.closeHelpmodal = this.closeHelpmodal.bind(this);
	  this.help = this.help.bind(this);
    this.state = { UsernameField: "", PasswordField: "", HideHelpmodal: true, errorMsg: ""};
  }
  UsernameChange(e) {
    var val = e.target.value;
    this.setState({UsernameField: val});
  }
  PasswordChange(e) {
    var val = e.target.value;
    this.setState({PasswordField: val});
  }
  tryLogin(e) {
    e.preventDefault();
    var PasswordField = this.state.PasswordField;
    var UsernameField = this.state.UsernameField;


	var inputObj = {};
		inputObj["UsernameField"] = UsernameField;
		inputObj["PasswordField"] = PasswordField;
	var jsonItem = JSON.stringify( inputObj );				 //// Package form item as a json string.
	var http = new XMLHttpRequest();						 //// set up http request
	http.onreadystatechange = function() {
		if (http.readyState == 4 && http.status == 200) {
			var response = http.responseText;
			console.log(response);
			this.setState({ errorMsg: response});
		}
	}.bind(this);
	var url = '/loginMachine/API/TryLogin'
	http.open('POST', url, true);
	http.setRequestHeader("Content-Type", "application/json");
	http.send(  jsonItem  );

  }
  closeHelpmodal()
  {
	this.setState({HideHelpmodal: true});
  }
  help() {
    this.setState({HideHelpmodal: false});
  }
  render() {
	var helpmodal;
	if( this.state.HideHelpmodal == false)
	{
		helpmodal =  <Helpmodal  close = {this.closeHelpmodal} />;
	}
	else {
		helpmodal = "";
	}

	var FeedBack = "";
	if( this.state.errorMsg != "" ) {
		FeedBack = <p id = "LoginformfeedBack" > There was a problem. <br />{this.state.errorMsg} </p>
	}

    return (
    <div id = "loginParentBox">
      <h1>Aquatic Employee Schedule Website </h1>
      <h2> Please login below</h2>
      <form id="myLoginForm" method ="post" action="/loginMachine/API/TryLogin" acceptCharset= "utf-8" >

		{FeedBack}
        <p>
		  <label> Username <br />
		  <input type="text" name="username"  maxLength="42"  onChange = {this.UsernameChange} autoFocus></input>
		  </label>
        </p>
        <p>
          <label> Password	<br />
          <input type="password" name ="password"  maxLength="20" onChange = {this.PasswordChange} ></input>
          </label>
        </p>
		<div>
			<p><button type ="Submit" id = "loginbutton" >Login</button></p>
			<p><button type = "button" onClick = {this.help}  id = "help">Help</button></p>
		</div>
      </form>
	  {helpmodal}
    </div>
    );
  }
}

export default Login;

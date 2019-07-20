import React, { Component } from 'react';
import './helpmodal.css';


class Helpmodal extends Component {
  constructor(props, context) {
    super(props, context);
    this.close = this.close.bind(this);	 
   
  }
  close(){
	this.props.close();
  }
  render() {
    return (
	<div id = "HelpModal" className= "modal">
	   <div id ="HelpModalContent">
	   	<div id="close" onClick = {this.close} >&times;</div>
	   	<div className="loginhelpmessage">
	   	  <h1>How to login</h1>
	   	  <p className="bold" >Step 1:</p> <p>Confirm with your supervisor that you are using the correct Username and Password. </p>
	   	  <p className="bold" >Step 2:</p> <p>Enter your Username using the correct format  "<span className = "bold">Firstname.Lastname</span>". Make sure you put the period in the middle. </p>
	   	  <p className="bold" >Step 3:</p> <p>Enter your password for your account. </p>
	   	  <p className="bold" >Step 4:</p> <p>Click on the green login button. </p>
	   	  <p className="TextCenter bold">If you are still having trouble, ask Norman for help.</p>
		  	<div id="close" onClick = {this.close} >Close</div>
	   	</div>
	   </div>
	 </div>			  
	);
  }
}

export default Helpmodal;

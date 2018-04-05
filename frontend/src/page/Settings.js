import React, { Component } from 'react';
import {CognitoUser} from "amazon-cognito-identity-js";
import { FormGroup, FormControl, ControlLabel, Button } from "react-bootstrap";
import {Link} from 'react-router-dom';
import { getCurrentUser, changePassword } from '../libs/awsLib.js';
import sapielogo from "../logos/sapielogo90.png";

import LoaderButton from "./components/LoaderButton";

const rootStyle = {
    textAlign: 'center'
};

const formStyle = {
  margin: '0 auto',
  maxWidth: '320px'
}

const buttonStyle = {
  //backgroundColor: '#66b2b2',
  borderRadius: '4px',
  color: 'black',
  padding: '5px 10px',
  border: '1',
  fontSize: '1em'
}

export default class Settings extends Component{
  constructor(props){
    super(props);


    this.state = {
      isLoading: false,
      oldPassword: '',
      newPassword: '',
      change: false
    };
  }

  validateForm() {
    return this.state.oldPassword.length > 0 && this.state.newPassword.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleClick() {
    window.location = "/app/unsubscribe";
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });

    try {
      await changePassword(this.props.user, this.state.oldPassword,this.state.newPassword);
      this.setState({ isLoading: false });
      alert("Password successfully changed!");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  render(){
    return(
      <div className= "Settings" style = {rootStyle}>
        <br />
        <br />
        <p>
          <a href={"./app/home"} target="_blank">
              <img src={sapielogo} style={{height: '15%', width: '15%', paddingBottom: '20px'}} />
          </a>
          <h3>Settings for <b>{getCurrentUser().username}</b></h3>

          {this.props.subscribed
          ?
          <div>

            <p>Subscribed: true</p>
            <br />
            <button onClick={this.handleClick} style={buttonStyle}> Click to unsubscribe </button>
          </div>

          :[
            <Link to= "/app/subscribe">Subscribed: false, Click to subscribe </Link>
          ]
          }
        </p>

        {!this.state.change
          ?<Button onClick = {()=> this.setState({change: true})}>Change Password</Button>
          :[<form key={1} onSubmit={this.handleSubmit} style= {formStyle}>
            <FormGroup controlId= "oldPassword" bsSize= "large">
              <ControlLabel>Current password</ControlLabel>
              <FormControl
                autoFocus
                type="password"
                value={this.state.oldPassword}
                placeholder="current password"
                onChange={this.handleChange}
              />
            </FormGroup>
              <FormGroup controlId= "newPassword" bsSize= "large">
                <ControlLabel>New password</ControlLabel>
                <FormControl
                  autoFocus
                  type="password"
                  value={this.state.newPassword}
                  placeholder="A-Z + a-z + 0-9 + !@#$%^"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <LoaderButton
                block
                bsSize="large"
                disabled={!this.validateForm()}
                type="submit"
                isLoading={this.state.isLoading}
                text="Change Password"
                loadingText="Changing..."
              />
            </form>
        ]
      }
      </div>
    )
  }
}

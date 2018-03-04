import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { updateCustomAttributes, getAttributes } from '../libs/awsLib';
import {  CognitoUserAttribute } from "amazon-cognito-identity-js";


class Subscribe extends Component {
  constructor(props) {
    super(props);
    this.onToken = this.onToken.bind(this);
  }

  async onToken(token) {
    var i =0;
    var attributes = await getAttributes();
    for( i = 0; i< attributes.length; i++){
      if(attributes[i].Name === "email"){
        break;
      }
    }
    //Check to see if current user email is the same as inputed email
    console.log(attributes);
    if (attributes[i].Value !== token.email) {
      window.location = "./emailerror"
    }
    else {

      var postData = {
          stripeToken: token.id,
          stripeEmail: token.email,
      };

      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*"
          }
      };

      //http://ec2-34-209-86-220.us-west-2.compute.amazonaws.com:5000
      //http://127.0.0.1:5000

      var e = document.getElementById("plans");
      var strUser = e.options[e.selectedIndex].value;
      console.log("Plan " + strUser);


      //If user email entered is the same as currently logged in
      //Else throw error and redo page

      if (strUser === "Monthly") {
        axios.post('http://ec2-34-209-86-220.us-west-2.compute.amazonaws.com:5000/charge_monthly', postData, axiosConfig)
        .then(async function (response) {
          console.log("Charge confirmation sent to " + token.email + " //success");

          var subs = response.data.subscription;
          var subscription_id = subs.id;
          var user_email = token.email;

          const attributeList= [
            new CognitoUserAttribute({
              Name: 'custom:subs_id',
              Value: subs.id
            }),
            new CognitoUserAttribute({
              Name: 'custom:subs_type',
              Value: strUser
            }),
            new CognitoUserAttribute({
              Name: 'custom:subs_active',
              Value: "true"
            })
          ]
          await updateCustomAttributes(attributeList);
          this.props.userHasSubscribed(true);
          /*
            Save the subscription_id to the the user in cognito with the
            email user_email. The subscription_id is used to cancel the subscription
            later on.

            Allow access to payed authenticated routes and now display
            Unsubscribe page instead of subscribe page.
          */

          window.location = "./confirmation"

        }).catch(error => {
          console.log(error)
        });
      }

      else if (strUser === "Yearly") {
        axios.post('http://ec2-34-209-86-220.us-west-2.compute.amazonaws.com:5000/charge_yearly', postData, axiosConfig)
        .then(async function (response) {
          console.log("Charge confirmation sent to " + token.email + " //success");

          var subs = response.data.subscription;
          var subscription_id = subs.id;
          var user_email = token.email;

          const attributeList= [
            new CognitoUserAttribute({
              Name: 'custom:subs_id',
              Value: subs.id
            }),
            new CognitoUserAttribute({
              Name: 'custom:subs_type',
              Value: strUser
            }),
            new CognitoUserAttribute({
              Name: 'custom:subs_active',
              Value: "true"
            })
          ]
          await updateCustomAttributes(attributeList);
          this.props.userHasSubscribed(true);

          /*
            Save the subscription_id to the the user in cognito with the
            email user_email. The subscription_id is used to cancel the subscription
            later on.

            Allow access to payed authenticated routes and now display
            Unsubscribe page instead of subscribe page.
          */

          window.location = "./confirmation"


        }).catch(error => {
          console.log(error)
        });
      }

      else {
          console.log("No plan selected");
      }
  }
  }


  render() {
    return (
      <div>
        <center>
        <br></br>
          <div>
            <h5>Please use the same email you signed up wtih</h5>
            <br></br>
            <h3><b>$299.00</b> for a monthly subscription</h3>
            <h3><strike>$3588.00</strike> <b>$3229.20 </b>for a yearly subscription</h3>
            <h4>10% for a yearly subscription!</h4>

            <select id="plans">
              <option value="" disabled selected hidden >Select your option</option>
              <option value="Yearly">Yearly</option>
              <option value="Monthly">Monthly</option>
            </select>
            <br></br>
            <br></br>
            <StripeCheckout
              token={this.onToken}
              stripeKey="pk_live_AEuriPJROzqDhDu5Y73oTUR4"
            />
          </div>
        </center>
      </div>
    );

  }
}

export default Subscribe;

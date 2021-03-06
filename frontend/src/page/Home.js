import React, { Component } from 'react';

import HomeContent from '../layout/HomeContent';
import MainContent from '../layout/MainContent';
import Filler from '../layout/Filler';

import BigSearchBox from '../components/BigSearchBox';
import TopSearches from '../components/TopSearches';
import { updateCustomAttributes, getAttributes } from '../libs/awsLib';
import {
  CognitoUserAttribute
} from "amazon-cognito-identity-js";

import sapielogo from "../logos/sapielogo90.png";

var lightGray = '#C3C3C3';


const backButtonStyle = {
  backgroundColor: lightGray,
  borderRadius: '20px',
  color: 'white',
  padding: '5px 10px',
  fontWeight: '100px',
  border: '0',
}

class Home extends Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
      window.location = "./Campaign"
    }

    async checkTrial() {
      var attributes = await getAttributes();

      //FILL ARRAY WITH SUBSCRIPTION BYPASS emails_bypass
      //TODO @Brody

      var emails_bypass = ["nbavafa@gmail.com"];

      var i =0;
      var trial = false;
      var daysLeft = 0;
      var trialIndex = 0;

      for( i = 0; i < attributes.length; i++){

        if(attributes[i].Name === "custom:subs_type"){
          trialIndex = i;

          if(attributes[i].Value === "trial") {

            trial = true;
            daysLeft = 7 - ((new Date().getTime() - parseInt(attributes[i].Value))/(1000 * 60 * 60 * 24));

            if (daysLeft <= 0) {

              const attributeList= [
                   new CognitoUserAttribute({
                     Name: 'custom:subs_id',
                     Value: ""
                   }),
                   new CognitoUserAttribute({
                     Name: 'custom:subs_type',
                     Value: "noTrial"
                   }),
                   new CognitoUserAttribute({
                     Name: 'custom:subs_active',
                     Value: "false"
                   })
                 ]

              await updateCustomAttributes(attributeList);

            }
          }
        }
      }
      var k = 0;
      var j = 0;


      for(k = 0; k < attributes.length; k++) {

        if(attributes[k].Name === "email") {

          for (j = 0; j < emails_bypass.length; j++) {

            if (emails_bypass[j] === attributes[k].Value) {

              if (attributes[trialIndex].Value === "noTrial") {

                const attributeList= [
                  new CognitoUserAttribute({
                    Name: 'custom:subs_id',
                    Value: new Date().getTime().toString()

                  }),
                  new CognitoUserAttribute({
                    Name: 'custom:subs_type',
                    Value: "trial"
                  }),
                  new CognitoUserAttribute({
                    Name: 'custom:subs_active',
                    Value: "true"
                  }),
                ]

                await updateCustomAttributes(attributeList);
                window.location = "https://app.sapie.space/app/home";
              }

            }

          }

        }

      }
    }

    render() {
      this.checkTrial();

        return (
            <React.Fragment>
              <HomeContent>
                <Filler />
                <MainContent>
                  <br />
                  <center><img src={sapielogo} style={{height: '20%', width: '26%'}} /></center>
                  <br />
                  <div style={{textAlign: 'center', color: '#5F5F5F'}}>
                    <BigSearchBox />
                                      <button style={backButtonStyle} onClick={this.handleClick}> Or Launch a Campaign! </button>

                    <TopSearches />

                  </div>


                </MainContent>
                <Filler />
              </HomeContent>
            </React.Fragment>
        );
    }
}

export default Home;

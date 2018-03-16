import React, { Component } from 'react';

const trialButtonStyle = {
  backgroundColor: '#711AAC',
  borderRadius: '20px',
  color: 'white',
  padding: '10px 10px',
  border: '0',
  fontSize: '1em'
}

class TrialConfirmation extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    window.location = "./home"
  }
  render() {
    return (
      <div>
        <br></br>
        <br></br>
        <br></br>
        <center>
          <h3> You have begun your 7 day trial today!</h3>
          <br></br>
          <button onClick={this.handleClick} style={trialButtonStyle}> Go to Home </button>
        </center>
      </div>
    );
  }
}

export default TrialConfirmation;
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

const rootStyle = {
    display: 'flex',
    fontSize: '20px',
    flexDirection: 'column',
    flexGrow: '1',
    marginTop: '100px',
    textDecoration: 'none',
    position: 'relative'
};

const inputStyle = {
    border: '1.3px solid var(--secondary-color)',
    borderRadius: '3em',
    flexGrow: '1',
    height: '40px',
    lineHeight: '1em',
    marginBottom: '20px',
    padding: '15px 18px',
    fontSize: '1em',
    fontWeight: '300',

};


const styleButton  = {
  position: 'absolute',
  textAlign: 'center',
  right: '0'
}

const buttonStyle = {
    backgroundColor: 'var(--primary-color)',
    border: '1px solid var(--primary-color)',
    borderRadius: '3em',
    color: '#FFFFFF',
    display: 'inline-block',
    lineHeight: '40px',
    width: '100px',
    height: '40px',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '.75em',
};

class BigSearchBox extends Component {

    constructor(props) {
        super(props);
        this.state = { search: '', goSearch: false };
    }

    changeHandler = (evt) => this.setState({ search: evt.target.value });

    searchHandler = (evt) => this.setState({ goSearch: true });

    handleKeyPress = (event) => {

        if (event.key === 'Enter') { this.setState({ goSearch: true }); };
    }

    render() {
        if (this.state.goSearch) {
            const url = `/app/search?query=${this.state.search}=yyy`;
            return <Redirect push={true} to={url} />;
        }
        return (
            <div style={rootStyle}>
              <input type="text"
                     placeholder="Search for influencers..."
                     style={inputStyle}
                     value={this.state.search}
                     onChange={this.changeHandler}
                     onKeyPress={this.handleKeyPress}
                     />
              <div style={styleButton}>
                <button style={buttonStyle} onClick={this.searchHandler}>Search</button>
              </div>
            </div>
        );
    }
}

export default BigSearchBox;

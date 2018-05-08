import React from 'react';
import PropTypes from 'prop-types';

class CheckboxOrRadioGroup extends React.Component {

  render() {
    return (
      <div>
        <label className="form-label">{props.title}</label>
        <div className="checkbox-group">
          {this.props.options.map(opt => {
              <label key={opt} className="form-label capitalize">
                <input
                  className="form-checkbox"
                  name={this.props.setName}
                  onChange={this.props.controlFunc}
                  value={opt}
                  checked={ this.props.selectedOptions.indexOf(opt) > -1 }
                  type={this.props.type} /> {opt}
              </label>
          })}
        </div>
      </div>
    );
  }

}

CheckboxOrRadioGroup.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['checkbox', 'radio']).isRequired,
  setName: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  selectedOptions: PropTypes.array,
  controlFunc: PropTypes.func.isRequired
};

export default CheckboxOrRadioGroup;

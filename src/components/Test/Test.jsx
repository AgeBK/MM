/*eslint-disable*/
// @flow
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import MMContainer from '../../containers/MMContainer/MMContainer';
import Config from '../../config.json';
import { hideLoadingPH } from '../../utils';
import days from '../../js/days.json';

type Props = {
  location: {
    state: {
      data: string
    }
  }
};

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'Fred',
      lastName: 'Smith',
      street: 'Waratah',
      suburb: 'Manly',
      email: 'age@gmail.com',
      usrForm: null
    };

    this.formFields = {
      firstName: {
        id: 'firstName',
        label: 'First Name',
        value: this.state.firstName,
        type: 'text'
      },
      lastName: {
        id: 'lastName',
        label: 'Last Name',
        value: this.state.lastName,
        type: 'text'
      },
      street: {
        id: 'street',
        label: 'Street',
        value: this.state.street,
        type: 'text'
      },
      suburb: {
        id: 'suburb',
        label: 'Suburb',
        value: this.state.suburb,
        type: 'text'
      },
      days: {
        id: 'days',
        label: 'Days',
        options: this.getDays(),
        type: 'select'
      },
      email: {
        id: 'email',
        label: 'Email',
        value: this.state.email,
        type: 'text'
      }
    };
  }

  componentDidMount() {
    this.buildForm();
  }

  getDays = () => {
    console.log('get days');
    let items = [];
    for (let i = 32; i > 0; i--) {
      items.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return items;
  };

  updateField = e => {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => this.buildForm()
    );
  };

  buildForm = () => {
    const usrForm = Object.keys(this.formFields).map(field => {
      // debugger;
      // console.log(this.formFields[field].value);
      // console.log(this.state[field]);

      this.formFields[field].value = this.state[field];

      // console.log(field); // firstName key
      // console.log(this.formFields); // this.formFields
      // console.log(this.formFields[field].type); // firstName

      switch (this.formFields[field].type) {
        case 'text':
          return (
            <div key={this.formFields[field].id}>
              <label className="testing">{this.formFields[field].label}</label>
              <input
                id={this.formFields[field].id}
                type={this.formFields[field].type}
                value={this.formFields[field].value}
                onChange={this.updateField}
                name={field}
                readonly={true}
              />
            </div>
          );
        case 'select':
          return (
            <div key={this.formFields[field].id}>
              <label className="testing">{this.formFields[field].label}</label>
              <select
                id={this.formFields[field].id}
                onChange={this.updateField}
                name={field}
              >
                {this.formFields[field].options}
              </select>
            </div>
          );
        default:
          break;
      }
    });
    this.setState({
      usrForm: usrForm
    });
  };

  render() {
    return <Fragment> {this.state.usrForm} </Fragment>;
  }
}

export default Test;

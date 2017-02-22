import React from 'react';
import { hashHistory } from 'react-router';

import { inject, observer } from 'mobx-react';

import { CREDIT_CARD_TYPES, CARD_EXPIRY_MONTHS } from '../constants';

@inject('store')
@observer
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isProcessing: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(event) {
    this.props.store.setPaymentField(event.target.name, event.target.value);
  } 

  handleBlur(event) {
    this.props.store.payment[event.target.name].validate();
  }

  handleSubmit(event) {
    let userDetails = this.props.store;    
    let valid = this.props.store.validatePayment();
    event.preventDefault();
    if (valid) {
      this.props.store.submitRegistration(userDetails);
      this.setState({ isProcessing: true });      
    }
  }

  renderInputField(name) {
    let field = this.props.store.payment[name];
    return (
      <div class={'form-group ' + (field.errors.length > 0 && 'has-error')}>
        <div class="col-md-12">
          <input
            name={field.name}
            placeholder={field.label}
            class="form-control"
            type="text"
            value={field.value}
            onChange={this.handleChange}
            onBlur={this.handleBlur} />
          {field.errors.length > 0 && field.errors.map(error => (
            <span key={error} class="text-danger">
              {error}&nbsp;
            </span>
          ))}
        </div>
      </div>
    );
  }

  renderSelectOptionField(name, options) {
    let field = this.props.store.payment[name];
    var optionList = []
    if (options.length != 0) {
      for (var i = 0; i < options.length; i++) {
        optionList.push(
          <option value={options[i]['value']} key={i} > {options[i]['name']} </option>
        )
      }
    }
    return (
      <div class={'form-group ' + (field.errors.length > 0 && 'has-error')}>
        <div class="col-md-12">
          <select
            value={field.value}
            name={field.name}
            class="form-control"
            onChange={this.handleChange}
            onBlur={this.handleBlur}>
            {optionList}
          </select>
          {field.errors.length > 0 && field.errors.map(error => (
            <span key={error} class="text-danger">
              {error}&nbsp;
            </span>
          ))}
        </div>
      </div>
    );
  }

  render() {
    let { userResponse } = this.props.store;
    if(userResponse != null) {
      this.state.isProcessing = false;
      if (userResponse.status == 'ok') {
        hashHistory.push('result');
      } else {
        alert(userResponse.error_description);
      }
    }

    var date = new Date()
    var startYear = date.getFullYear()
    var years = [{value: '', name: 'Please Choose Expiry Year' }];
    for(var i=0; i<11; i++) {		
      var allYear = startYear + i
      years.push({value: allYear, name: allYear })
    }

    return (
      <form class="form-horizontal" onSubmit={this.handleSubmit}>
        {this.renderSelectOptionField('cardType', CREDIT_CARD_TYPES)}
        {this.renderInputField('cardHolderName')}
        {this.renderInputField('creditCardNumber')}
        {this.renderSelectOptionField('cardExpiryMonth', CARD_EXPIRY_MONTHS)}
        {this.renderSelectOptionField('cardExpiryYear', years)}
        {this.renderInputField('cardCvv')}
        {this.renderInputField('coupon')}
        <div class="form-group">
          <div class="col-md-12">
            <input
              type="submit"
              value={this.state.isProcessing ?
							  'Processing...' : 'Submit Payment'}
              disabled={this.state.isProcessing}
              class="btn btn-primary btn-block" 
            />
          </div>
        </div>
      </form>
    );
  }
}

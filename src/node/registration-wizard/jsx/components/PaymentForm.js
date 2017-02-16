import React from 'react';
import { hashHistory } from 'react-router';

import { inject, observer } from 'mobx-react';

@inject('store')
@observer
export default class extends React.Component {
    constructor(props) {
        super(props);
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
        // TODO Need to disable the submit button so that the user doesn't
        //  accidentally submit more than once. Also need to display some
        //  loader graphic instead.
        let { payment, profile } = this.props.store;
        // TODO Need to actually validate payment fields similar to how it is implemented
        //  in the profile form handleSubmit.
				
        let valid = this.props.store.validatePayment();
        event.preventDefault();
        if (valid) {
            this.props.store.submitRegistration(profile, payment);
            //hashHistory.push('result');
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
							< option value = {options[i]['value']} key={i} > {options[i]['label']} < /option>
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
        /* TODO I started you off with card holder name and credit card num, but now
            we need to add the rest of the payment fields. Notice that the Field 
            class in store.js only does
            basic validation. This class should be tweaked to accomodate
            more complex (regex based) validation, such as numeric-only,
            exparation date, etc. */
				let { userResponse } = this.props.store;
				if(userResponse != null) {
					if (userResponse.status == 'ok') {
						hashHistory.push('result');
					} else {
							alert(userResponse.error_description);
						}
				}
				let cardType = [{ value: '', label: 'Please Choose Card Type' },{ value: 'Visa', label: 'Visa' },{ value: 'Master Card', label: 'Master Card' },{ value: 'American Express', label: 'American Express' }];
				let months = [{ value: '', label: 'Please Choose Expiry Month' },{ value: '01', label: '01' },{ value: '02', label: '02' },{ value: '03', label: '03' },{ value: '04', label: '04' },{ value: '05', label: '05' },{ value: '06', label: '06' },{ value: '07', label: '07' },{ value: '08', label: '08' },{ value: '09', label: '09' },{ value: '10', label: '10' },{ value: '11', label: '11' },{ value: '12', label: '12' }];	
				var date = new Date()
				var startYear = date.getFullYear()
				var years = [{ value: '', label: 'Please Choose Expiry Year' }];
				for(var i=0; i<11; i++) {		
					var allYear = startYear + i
					years.push({ value: allYear, label: allYear })
				}
				
        return (
            <form class="form-horizontal" onSubmit={this.handleSubmit}>
                {this.renderSelectOptionField('cardType', cardType)}
                {this.renderInputField('cardHolderName')}
                {this.renderInputField('creditCardNumber')}
                {this.renderSelectOptionField('cardExpiryMonth', months)}
                {this.renderSelectOptionField('cardExpiryYear', years)}
                {this.renderInputField('cardCvv')}
                {this.renderInputField('coupon')}
                <div class="form-group">
                    <div class="col-md-12">                                
                        <input 
                            type="submit" 
                            value="Submit Payment" 
                            class="btn btn-primary btn-block" />
                    </div>
                </div>
            </form>
        );
     }
}

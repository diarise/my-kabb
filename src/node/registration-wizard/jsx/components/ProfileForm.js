import React from 'react';
import { hashHistory } from 'react-router';

import { inject, observer } from 'mobx-react';
import { COUNTRIES, MONTHS, DAYS_OF_MONTH, LANGUAGES, GENDERS, TEACHERS } from '../constants';

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

	componentWillMount() {
		this.props.store.getTeachers();
	}

	handleChange(event) {
		this.props.store.setProfileField(event.target.name, event.target.value);
	}

	handleBlur(event) {
		this.props.store.profile[event.target.name].validate();
	}

	handleSubmit(event) {
		let { subscriptionType } = this.props.store;
		let userDetails = this.props.store;
		let valid = this.props.store.validateProfile();
		event.preventDefault();
		if (valid) {
			if (subscriptionType == 'free') {
				this.props.store.submitRegistration(userDetails);				
				this.setState({ isProcessing: true });
				//hashHistory.push('result');
			} else {
				hashHistory.push('payment');
			}
		}
	}

	renderInputField(name) {
		let field = this.props.store.profile[name];
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

	renderPasswordInputField(name) {
		let field = this.props.store.profile[name];
		return (
			<div class={'form-group ' + (field.errors.length > 0 && 'has-error')}>
				<div class="col-md-12">
					<input
						name={field.name}
						placeholder={field.label}
						class="form-control"
						type="password"
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
		let field = this.props.store.profile[name];
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
	/* TODO I started you off with firstname and lastname, but now
		we need to add the rest of the profile fields. These are all 
		the fields on the IDP regiration form except credit card
		information. Notice that the Field class in store.js only does
		basic validation. This class should be tweaked to accomodate
		more complex validation, such as email address (regex based)
		validation, etc. */
	  let { teachers, userResponse } = this.props.store;
		if(userResponse != null) {
			this.setState({ isProcessing: false });
			if (userResponse.status == 'ok') {
			  hashHistory.push('result');
			} else {
			  alert(userResponse.error_description);
			}
		}
	  var myDate = new Date();
	  var year = myDate.getFullYear();
	  var years = [{name: 'Please Choose DOB Year', value: '' }];
		for(var i = 1900; i < year+1; i++) {
		  years.push({ name: i, value: i })
		}
	  		return (
				<form class="form-horizontal" onSubmit={this.handleSubmit}>
						{this.renderInputField('firstName')}
						{this.renderInputField('lastName')}
						{this.renderInputField('userName')}
						{this.renderInputField('email')}
						{this.renderInputField('confirmEmail')}
						{this.renderPasswordInputField('pass')}
						{this.renderPasswordInputField('confirmPass')}
						{this.renderSelectOptionField('month', MONTHS)}
						{this.renderSelectOptionField('day', DAYS_OF_MONTH)}
						{this.renderSelectOptionField('year', years)}
						{this.renderSelectOptionField('gender', GENDERS)}
						{this.renderSelectOptionField('teacher', TEACHERS)}
						{this.renderSelectOptionField('country', COUNTRIES)}
						{this.renderInputField('state')}
						{this.renderInputField('city')}
						{this.renderSelectOptionField('language', LANGUAGES)}
						{this.renderInputField('billingPhone')}
						<div class="form-group">
							<div class="col-md-12">
								<input
									type="submit"
									value={this.state.isProcessing ?
										'Processing...' : 'Create Account'}
									disabled={this.state.isProcessing}
									class="btn btn-primary btn-block"
								/>
							</div>
						</div>
				</form>
		);
	}
}

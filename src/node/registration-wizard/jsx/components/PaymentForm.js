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
        let { payment } = this.props.store;
        // TODO Need to actually validate payment fields similar to how it is implemented
        //  in the profile form handleSubmit.
        let valid = true;
        event.preventDefault();
        if (valid) {
            this.props.store.submitRegistration();
            hashHistory.push('result');
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

    render() {
        /* TODO I started you off with card holder name and credit card num, but now
            we need to add the rest of the payment fields. Notice that the Field 
            class in store.js only does
            basic validation. This class should be tweaked to accomodate
            more complex (regex based) validation, such as numeric-only,
            exparation date, etc. */
        return (
            <form class="form-horizontal" onSubmit={this.handleSubmit}>
                {this.renderInputField('cardHolderName')}
                {this.renderInputField('creditCardNumber')}
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

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
        this.props.store.setProfileField(event.target.name, event.target.value);
    }

    handleBlur(event) {
        this.props.store.profile[event.target.name].validate();
    }

    handleSubmit(event) {
        let { profile } = this.props.store;
        let valid = this.props.store.validateProfile();
        event.preventDefault();
        if (valid) {
            hashHistory.push('payment');
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

    render() {
        /* TODO I started you off with firstname and lastname, but now
            we need to add the rest of the profile fields. These are all 
            the fields on the IDP regiration form except credit card
            information. Notice that the Field class in store.js only does
            basic validation. This class should be tweaked to accomodate
            more complex validation, such as email address (regex based)
            validation, etc. */
        return (
            <form class="form-horizontal" onSubmit={this.handleSubmit}>
                {this.renderInputField('firstName')}
                {this.renderInputField('lastName')}
                <div class="form-group">
                    <div class="col-md-12">                                
                        <input 
                            type="submit" 
                            value="Create Account" 
                            class="btn btn-primary btn-block" />
                    </div>
                </div>
            </form>
        );
     }
}

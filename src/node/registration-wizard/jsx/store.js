import {action, observable } from 'mobx';

import services from './services'

class Field {
    @observable value = '';
    @observable errors = [];
    constructor(name, label, required=true, minChars=0) {
        this.name = name;
        this.label = label;
        this.required = required;
        this.minChars = minChars;
    }

    validate() {
        this.errors.replace([]);
        if (this.value.length < this.minChars) {
            this.errors.push(`This field must be at least ${this.minChars} characters`);
        }
        if (!this.value.length && this.required) {
            this.errors.push('This field is required');
        }        
    }
}

class Store {
    @observable subscriptionType = 'free';

    profile = {
        firstName: new Field('firstName', 'First Name'),
        lastName: new Field('lastName', 'Last Name'),
    }

    payment = {
        cardHolderName: new Field('cardHolderName', 'Card Holder Name'),
        creditCardNumber: new Field('creditCardNumber', 'Credit Card Number'),
    }

    @action
    setSubscriptionType(subscriptionName) {
        // TODO validate that the subscriptionName is not null and matches 
        //  an actual subscription (or fallback if null)
        this.subscriptionType = subscriptionName;
    }

    @action
    setProfileField(key, value) {
        this.profile[key].value = value;
    }

    @action
    setPaymentField(key, value) {
        this.payment[key].value = value;
    }

    // Returns true if all profile fields are valid
    validateProfile() {
        let isValid = true;
        for (let [key, field] of Object.entries(this.profile)) {
            field.validate();
            if (field.errors.length) {
                isValid = false;
            }
        }
        return isValid;
    }

    // TODO Create a validatePayment function similar to validateProfile.

    submitRegistration() {
        // TODO construct actual payload with appropriate data
        let payLoad = 'This object should actually include profile and payment data';
        // TODO Need to actually process the web service call response, 
        //  and store errors/success so that observer components can
        //  react accordingly.      
        //services.submitRegistration(payLoad).then(data => {
            // TODO Do something meaningful with the returned data such
            //  as storing it in an observable object
        //}).catch(error => {
            // TODO Do something meaningful with the returned error such
            //  as storing it in an observable error object            
        //});
    }
}

const store = new Store;

export default store;
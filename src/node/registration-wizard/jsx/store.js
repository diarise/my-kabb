import { action, observable } from 'mobx';

import services from './services'

var confirmValue = observable({
  emailValue: null,
  passwordValue: null,
});

class Field {
  @observable value = '';
  @observable errors = [];
  constructor(name, label, required = true, minChars = 0) {
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
    let emailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let phoneFormat = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    var letters = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/
    switch (this.name) {
      case 'email':
        confirmValue.emailValue = this.value;
        if (!this.value.match(emailFormat) && this.value.length && this.required) {
          this.errors.push('Please enter a valid email address');
        }
        break;
      case 'confirmEmail':
        if (!this.value.match(emailFormat) && this.value.length && this.required) {
          this.errors.push('Please enter a valid email address');
        }
        if (confirmValue.emailValue != this.value && this.value.match(emailFormat) && this.value.length && this.required) {
          this.errors.push('Please enter the same value again');
        }
        break;
      case 'pass':
        confirmValue.passwordValue = this.value;
        break;
      case 'confirmPass':
        if (confirmValue.passwordValue != this.value && this.value.length && this.required) {
          this.errors.push('Please enter the same value again');
        }
        break;
      case 'billingPhone':
        if (!this.value.match(phoneFormat) && this.value.length && this.required || this.value.match('0000000000')) {
          this.errors.push('Please enter a valid phone number');
        }
        break;
      case 'state':
        if (!this.value.match(letters) && this.value.length && this.required) {
          this.errors.push('Please enter a valid state name');
        }
        break;
      case 'city':
        if (!this.value.match(letters) && this.value.length && this.required) {
          this.errors.push('Please enter a valid city name');
        }
        break;
      case 'cardCvv':
        var cvv = /^[0-9]{1,4}$/
        if ((!this.value.match(cvv)) && this.value.length && this.required) {
          this.errors.push('Please enter a valid security code');
        }
        break;
      case 'creditCardNumber':
        var cardNumber = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
        if ((!this.value.match(cardNumber)) && this.value.length && this.required) {
          this.errors.push('Please enter a valid card number');
        }
        break;
      case 'coupon':
        this.errors.replace([]);
        break;
    }
  }
}

class Store {
  @observable subscriptionType = 'free';
  @observable subscriptionCost = null;
  @observable teachers = []
  @observable userResponse = null;
  profile = {
    firstName: new Field('firstName', 'First Name'),
    lastName: new Field('lastName', 'Last Name'),
    userName: new Field('userName', 'User Name'),
    email: new Field('email', 'Email'),
    confirmEmail: new Field('confirmEmail', 'Confirm Email'),
    pass: new Field('pass', 'Password'),
    confirmPass: new Field('confirmPass', 'Confirm Password'),
    month: new Field('month', 'Month'),
    day: new Field('day', 'Day'),
    year: new Field('year', 'Year'),
    gender: new Field('gender', 'Gender'),
    teacher: new Field('teacher', 'Teacher'),
    country: new Field('country', 'Country'),
    state: new Field('state', 'State'),
    city: new Field('city', 'City'),
    language: new Field('language', 'Language'),
    billingPhone: new Field('billingPhone', 'Phone Number'),
  }

  payment = {
    cardType: new Field('cardType', 'Credit Card Type'),
    cardHolderName: new Field('cardHolderName', 'Card Holder Name'),
    creditCardNumber: new Field('creditCardNumber', 'Credit Card Number'),
    cardExpiryMonth: new Field('cardExpiryMonth', 'Credit Card Expiry Month'),
    cardExpiryYear: new Field('cardExpiryYear', 'Credit Card Expiry Year'),
    cardCvv: new Field('cardCvv', 'Credit Card CVV Number'),
    coupon: new Field('coupon', 'Coupon Code (If Available)'),
  }

  @action
  setSubscriptionType(subscriptionName) {
    // TODO validate that the subscriptionName is not null and matches 
    //  an actual subscription (or fallback if null)
    this.subscriptionType = subscriptionName;
    switch (this.subscriptionType) {
      case 'basic':
        this.subscriptionCost = '$9.00';
        break;
      case 'premium':
        this.subscriptionCost = '$18.00';
        break;
      case 'premiumPlus':
        this.subscriptionCost = '$42.00';
        this.subscriptionType = 'premium plus';        
        break;
    }
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
  // Returns true if all payment fields are valid  
  validatePayment() {
    let isValid = true;
    for (let [key, field] of Object.entries(this.payment)) {
      field.validate();
      if (field.errors.length) {
        isValid = false;
      }
    }
    return isValid;
  }

  submitRegistration(payLoad) {
    // TODO construct actual payload with appropriate data
    //let payLoad = 'This object should actually include profile and payment data';
    // TODO Need to actually process the web service call response, 
    //  and store errors/success so that observer components can
    //  react accordingly.      
    services.submitRegistration(payLoad).then(data => {
      this.userResponse = data;
      // TODO Do something meaningful with the returned data such
      //  as storing it in an observable object
    }).catch(error => {
      // TODO Do something meaningful with the returned error such
      //  as storing it in an observable error object            
    });
  }

  getTeachers() {
    // Using static data for testing purpose only, will be replaced with an API call below.
    /* Commenting the API call for testing purpose, checking with static data 
       only during testing the functionality
    
    services.getTeachers().then(data => {
      this.teachers = data;
    }).catch(error => {
      // catch error here
    });
    */
  }
  

}

const store = new Store;

export default store;
// TODO Promises are not supported in earlier versions of Internet Explorer
//  so we need to accomodate. I think we need the es6-promise library.
//  Google this to find recommended method.
import axios from 'axios';

import env from './env';

function submitRegistration(payLoad) {
    let url = env.POST_REGISTRATION_URL;
    let data;
    let subscriptionId;
    if (payLoad.subscriptionType == 'basic') {
        subscriptionId = '2';
    } else if (payLoad.subscriptionType == 'premium') {
        subscriptionId = '3';
    } else if (payLoad.subscriptionType == 'premiumPlus') {
        subscriptionId = '4';
    } else {
        subscriptionId = '1';
    }
    if (payLoad.subscriptionType != 'free') {
        data = { "first_name": payLoad.profile.firstName.value, "last_name": payLoad.profile.lastName.value, "user_name": payLoad.profile.userName.value, "email": payLoad.profile.email.value, "confirm_email": payLoad.profile.confirmEmail.value, "pass": payLoad.profile.pass.value, "dob": { "month": payLoad.profile.month.value, "day": payLoad.profile.day.value, "year": payLoad.profile.year.value }, "gender": payLoad.profile.gender.value, "teacher": payLoad.profile.teacher.value, "country": payLoad.profile.country.value, "state": payLoad.profile.state.value, "city": payLoad.profile.city.value, "language": payLoad.profile.language.value, "billing_phone": payLoad.profile.billingPhone.value, "cc_type": payLoad.payment.cardType.value, "card_holder": payLoad.payment.cardHolderName.value, "card_number": payLoad.payment.creditCardNumber.value, "cc_exp_month": payLoad.payment.cardExpiryMonth.value, "cc_exp_year": payLoad.payment.cardExpiryYear.value, "card_cvv": payLoad.payment.cardCvv.value, "coupon": payLoad.payment.coupon.value, "amount": payLoad.subscriptionCost, "subscription_id": subscriptionId, "subscription_name": payLoad.subscriptionType };
    } else {
        data = { "first_name": payLoad.profile.firstName.value, "last_name": payLoad.profile.lastName.value, "user_name": payLoad.profile.userName.value, "email": payLoad.profile.email.value, "confirm_email": payLoad.profile.confirmEmail.value, "pass": payLoad.profile.pass.value, "dob": { "month": payLoad.profile.month.value, "day": payLoad.profile.day.value, "year": payLoad.profile.year.value }, "gender": payLoad.profile.gender.value, "teacher": payLoad.profile.teacher.value, "country": payLoad.profile.country.value, "state": payLoad.profile.state.value, "city": payLoad.profile.city.value, "language": payLoad.profile.language.value, "billing_phone": payLoad.profile.billingPhone.value, "amount": payLoad.subscriptionCost, "subscription_id": subscriptionId, "subscription_name": payLoad.subscriptionType };
    }
    /* TODO use axios to return a promise. Here is an example of axios.get.
        axios.post is very similar (you just need to provide the payload).
        Please use arrow functions for neatness.
		*/
    return (
        axios.post(url, data)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                //throw 'Ajax module: '+error // E.g. could be: Network Error
            })
    )

    return (
        'Need to actually return a promise...'
    );
}
function getTeachers() {
    let url = env.GET_TEACHERS_URL;
    /* TODO use axios to return a promise. Here is an example of axios.get.
        axios.post is very similar (you just need to provide the payload).
        Please use arrow functions for neatness.
		*/
    return (
        axios.get(url)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                //throw 'Ajax module: '+error // E.g. could be: Network Error
            })
    )

    return (
        'Need to actually return a promise...'
    );
}
export default {
    submitRegistration,
    getTeachers,
}
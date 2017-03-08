import axios from 'axios';

import env from './env';

function submitRegistration(payLoad) {
    let url = env.POST_REGISTRATION_URL;
    let data;  
    if (payLoad.subscriptionType != 'free') {
        data = { "first_name": payLoad.profile.firstName.value, "last_name": payLoad.profile.lastName.value, "user_name": payLoad.profile.userName.value, "email": payLoad.profile.email.value, "confirm_email": payLoad.profile.confirmEmail.value, "pass": payLoad.profile.pass.value, "dob": { "month": payLoad.profile.month.value, "day": payLoad.profile.day.value, "year": payLoad.profile.year.value }, "gender": payLoad.profile.gender.value, "teacher": payLoad.profile.teacher.value, "country": payLoad.profile.country.value, "state": payLoad.profile.state.value, "city": payLoad.profile.city.value, "language": payLoad.profile.language.value, "billing_phone": payLoad.profile.billingPhone.value, "cc_type": payLoad.payment.cardType.value, "card_holder": payLoad.payment.cardHolderName.value, "card_number": payLoad.payment.creditCardNumber.value, "cc_exp_month": payLoad.payment.cardExpiryMonth.value, "cc_exp_year": payLoad.payment.cardExpiryYear.value, "card_cvv": payLoad.payment.cardCvv.value, "coupon": payLoad.payment.coupon.value, "amount": payLoad.subscriptionPrice, "subscription_id": payLoad.subscriptionId, "subscription_name": payLoad.subscriptionType };
    } else {
        data = { "first_name": payLoad.profile.firstName.value, "last_name": payLoad.profile.lastName.value, "user_name": payLoad.profile.userName.value, "email": payLoad.profile.email.value, "confirm_email": payLoad.profile.confirmEmail.value, "pass": payLoad.profile.pass.value, "dob": { "month": payLoad.profile.month.value, "day": payLoad.profile.day.value, "year": payLoad.profile.year.value }, "gender": payLoad.profile.gender.value, "teacher": payLoad.profile.teacher.value, "country": payLoad.profile.country.value, "state": payLoad.profile.state.value, "city": payLoad.profile.city.value, "language": payLoad.profile.language.value, "billing_phone": payLoad.profile.billingPhone.value, "amount": payLoad.subscriptionPrice, "subscription_id": payLoad.subscriptionId, "subscription_name": payLoad.subscriptionType };
    }
    return (
        axios.post(url, data)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                alert(error);
                return false;
            })
    )
}

function checkUserExists(payLoad) {
    let url = env.CHECK_USER_EXISTS_URL;
    let userName = payLoad.profile.userName.value;
    let email = payLoad.profile.email.value;
    return (
        axios.get(url+'?userName='+userName+'&email='+email)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                alert(error);
                return false;
            })
    )
}

function getTeachers() {
    let url = env.GET_TEACHERS_URL;
    return (
        axios.get(url)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                alert(error);
            })
    )
}
export default {
    submitRegistration,
    getTeachers,
    checkUserExists,
}
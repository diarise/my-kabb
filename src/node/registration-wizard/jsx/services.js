// TODO Promises are not supported in earlier versions of Internet Explorer
//  so we need to accomodate. I think we need the es6-promise library.
//  Google this to find recommended method.
import axios from 'axios';

import env from './env';

function submitRegistration(profilePayLoad, paymentPayLoad) {
    let url = env.POST_REGISTRATION_URL;
		let data;
		if (paymentPayLoad != null) {
			data = {"first_name":profilePayLoad.firstName.value, "last_name":profilePayLoad.lastName.value, "user_name":profilePayLoad.userName.value, "email":profilePayLoad.email.value, "confirm_email":profilePayLoad.confirmEmail.value,  "pass":profilePayLoad.pass.value, "dob":{"month":profilePayLoad.month.value, "day":profilePayLoad.day.value, "year":profilePayLoad.year.value}, "gender":profilePayLoad.gender.value, "teacher":profilePayLoad.teacher.value, "country":profilePayLoad.country.value, "state":profilePayLoad.state.value, "city":profilePayLoad.city.value, "language":profilePayLoad.language.value, "billing_phone":profilePayLoad.billingPhone.value, "cc_type":paymentPayLoad.cardType.value, "card_holder":paymentPayLoad.cardHolderName.value, "card_number":paymentPayLoad.creditCardNumber.value,"cc_exp_month":paymentPayLoad.cardExpiryMonth.value, "cc_exp_year":paymentPayLoad.cardExpiryYear.value, "card_cvv":paymentPayLoad.cardCvv.value, "coupon":paymentPayLoad.coupon.value, "amount":"42", "subscription_id":"3","subscription_name":"premium"};
		} else {
				data = {"first_name":profilePayLoad.firstName.value, "last_name":profilePayLoad.lastName.value, "user_name":profilePayLoad.userName.value, "email":profilePayLoad.email.value, "confirm_email":profilePayLoad.confirmEmail.value,"pass":profilePayLoad.pass.value, "dob":{"month":profilePayLoad.month.value, "day":profilePayLoad.day.value, "year":profilePayLoad.year.value}, "gender":profilePayLoad.gender.value, "teacher":profilePayLoad.teacher.value, "country":profilePayLoad.country.value, "state":profilePayLoad.state.value, "city":profilePayLoad.city.value, "language":profilePayLoad.language.value, "billing_phone":profilePayLoad.billingPhone.value, "amount":"null","subscription_id":"1", "subscription_name":"free"};
			}
    /* TODO use axios to return a promise. Here is an example of axios.get.
        axios.post is very similar (you just need to provide the payload).
        Please use arrow functions for neatness.
		*/
                return (
                    axios.post(url,data)
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
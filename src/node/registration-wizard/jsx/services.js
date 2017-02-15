// TODO Promises are not supported in earlier versions of Internet Explorer
//  so we need to accomodate. I think we need the es6-promise library.
//  Google this to find recommended method.
import axios from 'axios';

import env from './env';

function submitRegistration(payLoad) {
    let url = env.POST_REGISTRATION_URL;
		let data = {"first_name":payLoad.firstName.value,"last_name":payLoad.lastName.value,"user_name":payLoad.userName.value,"email":payLoad.email.value,"confirm_email":payLoad.confirmEmail.value,"pass":payLoad.pass.value,"dob":{"month":payLoad.month.value,"day":payLoad.day.value,"year":payLoad.year.value},"gender":payLoad.gender.value,"teacher":payLoad.teacher.value,"country":payLoad.country.value,"state":payLoad.state.value,"city":payLoad.city.value,"language":payLoad.language.value,"billing_phone":payLoad.billingPhone.value,"cc_type":"Visa","card_holder":"surendra singh","card_number":"4111111111111111","cc_exp_month":"1","cc_exp_year":"2018","card_cvv":"123","coupon":"KU1PFREE","amount":"null","subscription_id":"3","subscription_name":"premium"};
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
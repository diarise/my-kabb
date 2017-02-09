// TODO Promises are not supported in earlier versions of Internet Explorer
//  so we need to accomodate. I think we need the es6-promise library.
//  Google this to find recommended method.
import axios from 'axios';

import env from './env';

function submitRegistration(payLoad) {
    let url = env.POST_REGISTRATION_URL;

    /* TODO use axios to return a promise. Here is an example of axios.get.
        axios.post is very similar (you just need to provide the payload).
        Please use arrow functions for neatness.

                return (
                    axios.get(url)
                        .then(response => {
                            return response.data;
                        })
                        .catch(error => {
                            throw 'Ajax module: '+error // E.g. could be: Network Error
                        })
                )  
    */  
    return (
        'Need to actually return a promise...'
    );
}

export default {
    submitRegistration,
}
import React from 'react';

import { inject, observer } from 'mobx-react';

import { PaymentForm } from '../components';

@inject('store')
@observer
export default class extends React.Component {
    /* TODO Need to validate that profile information is valid in the store before loading
        this view. For example, we want to make sure the user did not arrive at this
        view before going through the profile view first. If profile data is not
        valid, user should be redirected back to profile view. Perhaps this 
        belongs in the constructor */

    render() {
        let { subscriptionType } = this.props.store;
        let { profile } = this.props.store;
        // TODO Calculate the real cost
        let cost = '$42.00';

        // TODO Make the subscriptionType and price labels prettier
        return (
            <div class="col-md-12">
                <h1>Please Enter Your Payment Details</h1>
                <p>
                    <strong>Name:</strong>&nbsp;
                    {profile.firstName.value + ' ' + profile.lastName.value}
                </p>
                <p>
                    <strong>Subscription Type:</strong> {subscriptionType}
                </p>
                <p>
                    <strong>Total Monthly Cost:</strong> {cost}
                </p>
                <PaymentForm />
            </div>
        );
    }
}
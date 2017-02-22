import React from 'react';
import { hashHistory } from 'react-router';

import { inject, observer } from 'mobx-react';

import { PaymentForm } from '../components';

@inject('store')
@observer
export default class extends React.Component {
  constructor(props) {
		super(props);
	}

  componentWillMount() {
    let valid = this.props.store.validateProfile();
		if (!valid) {
      hashHistory.push('profile');
    }
	}

  render() {
    let { profile, subscriptionTitle, subscriptionPrice } = this.props.store;    
    return (
      <div class="col-md-12">
        <h1>Please Enter Your Payment Details</h1>
        <p>
          <strong>Name:</strong>&nbsp;
          {profile.firstName.value + ' ' + profile.lastName.value}
        </p>
        <p>
          <strong>Subscription Type:</strong> {subscriptionTitle}
        </p>
        <p>
          <strong>Total Monthly Cost:</strong> ${subscriptionPrice}
        </p>
        <PaymentForm />
      </div>
    );
  }
}
    
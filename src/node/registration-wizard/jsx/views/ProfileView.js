import React from 'react';

import { inject, observer } from 'mobx-react';

import { ProfileForm } from '../components';

let URLSearchParams = require('url-search-params');
@inject('store')
@observer
export default class extends React.Component {
  componentDidMount() {
    let urlParams = new URLSearchParams(window.location.search);
    let subscriptionName = urlParams.get('membership');
    this.props.store.setSubscriptionType(subscriptionName);
  }

  render() {
    let { subscriptionTitle } = this.props.store;
    return (
      <div class="col-md-12">
        <h1>Please Create Your Account</h1>
        <p>
          <strong>Subscription Type:</strong> {subscriptionTitle}
        </p>
        <ProfileForm />
      </div>
    );
  }
}

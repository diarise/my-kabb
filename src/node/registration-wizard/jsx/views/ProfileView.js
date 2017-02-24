import React from 'react';

import { inject, observer } from 'mobx-react';

import { ProfileForm } from '../components';

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
            <div class="container"> 
                <div class="row">
                    <div class="col-md-6 col-xs-12"> 
                        <h2>Please Create Your Account</h2>
                    </div>
                </div>      
                <div class="row">
                    <div class="col-md-6 col-xs-12"> 
                        <ProfileForm />
                    </div>
                    <div class="col-md-6 col-xs-12">
                        <div class="well">
                            <p>
                                <strong>Subscription Type:</strong> {subscriptionTitle}
                            </p>
                        </div>
                    </div>                
                </div>
            </div>
		);
	}
}

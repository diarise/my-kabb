import React from 'react';
import { hashHistory } from 'react-router';

import { inject } from 'mobx-react';

@inject('store')
export default class extends React.Component {
  constructor(props) {
		super(props);
	}

  componentWillMount() {
    let { userResponse } = this.props.store;
    if (userResponse == null) {
      hashHistory.push('profile');        
    }
	}  
  render() {
    return (
      <div class="col-md-12">
        <h1>Your Registration is Complete!</h1>
        <p>
          Thank you for registering with Kabbalah University. 
          Please use the following link to login with your new account:
        </p>
        <p>
          <a href="http://university.kabbalah.com">
            http://university.kabbalah.com
          </a>
        </p>
      </div>
    );
  }
}
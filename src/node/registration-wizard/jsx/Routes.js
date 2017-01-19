import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import ProfileEntry from './views/ProfileEntry';
import PaymentSubmission from './views/PaymentSubmission';

export default class extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/">
                    <IndexRoute component={ProfileEntry} />
                    <Route path="profile" component={ProfileEntry} />
                    <Route path="payment" component={PaymentSubmission} />
                </Route>
            </Router>
        );
    }
}
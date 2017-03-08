import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import { Provider } from 'mobx-react';

import { ProfileView, PaymentView, ResultView } from './views';
import store from './store';

export default class extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={hashHistory}>
                    <Route path="/">
                        <IndexRoute component={ProfileView} />
                        <Route path="profile" component={ProfileView} />
                        <Route path="payment" component={PaymentView} />
                        <Route path="result" component={ResultView} />
                    </Route>
                </Router>
            </Provider>
        );
    }
}
import React from 'react';
import { Link } from 'react-router'

import { ProfileForm } from '../components';

export default class extends React.Component {
    render() {
        return (
            <div class="col-md-12">
                <h1>Please Create Your Account</h1>
                <ProfileForm />
            </div>
        );
    }
}
import React from 'react';

import { inject } from 'mobx-react';

@inject('store')
export default class extends React.Component {
    render() {
        /* TODO Need to actually check whether registration succeeded. For exmple,
            need to check if the store->submitRegistration function resulted in
            success or error observable objects. If these are unset (e.g., no 
            success and no failre) it means the user got to this view without
            properly going through the other views, so they need to be
            redirected according */

        // TODO Non programming task: need to come up with text to display
        //  to the user for registration success and failure.
        return (
            <div class="col-md-12">
                <h1>Your Registration is Complete!</h1>
                <p>
                    Thank you for registering. Need to insert more text here...
                </p>
            </div>
        );
    }
}
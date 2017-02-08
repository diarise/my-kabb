import React from 'react';

import { inject, observer } from 'mobx-react';

@inject('store')
@observer
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        //this.setState({value: event.target.value});
        this.props.store.setProfileProperty(event.target.name, event.target.value);
    }

    handleSubmit(event) {
        let { profile } = this.props.store;
        alert('name is: ' + profile.firstName + ' ' + profile.lastName);
        event.preventDefault();
    }

    render() {
        let { profile } = this.props.store;

        return (
            <form class="form-horizontal" onSubmit={this.handleSubmit}>
                <div class="form-group">
                    <div class="col-md-12">
                        <input 
                            name="firstName"
                            placeholder="First Name"
                            class="form-control" 
                            type="text" 
                            value={profile.firstName} 
                            onChange={this.handleChange} />
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-md-12">
                        <input 
                            name="lastName"
                            placeholder="Last Name"
                            class="form-control" 
                            type="text" 
                            value={profile.lastName} 
                            onChange={this.handleChange} />
                    </div>
                </div> 
                <div class="form-group">
                    <div class="col-md-12">                                
                        <input 
                            type="submit" 
                            value="Create Account" 
                            class="btn btn-primary btn-block" />
                    </div>
                </div>
            </form>
        );
     }
}

import {action, observable } from 'mobx';

//import services from './services'

class Store {
    profile = observable({
        firstName: '',
        lastName: ''
    })

    @action
    setProfileProperty(key, value) {
        this.profile[key] = value;
    }
}

const store = new Store;

export default store;
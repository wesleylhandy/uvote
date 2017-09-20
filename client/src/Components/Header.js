import React, { Component } from 'react';
import Login from './Login';
import Logout from './Logout';
import Signup from './Signup';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }

    }
    render() {
        return ( 
            <div> Header

            </div>
        );
    }
}
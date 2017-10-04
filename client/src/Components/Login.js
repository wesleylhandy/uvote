import React, { Component } from 'react';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            user: {}
        }

    }
    render() {
        return (<button>Login</button>);
    }
}
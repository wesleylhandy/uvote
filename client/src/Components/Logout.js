import React, { Component } from 'react';

export default class Logout extends Component {
    constructor(props) {
        super(props);
        this.state={
            user: {}
        }

    }
    render() {
        return (<button>Logout</button>);
    }
}
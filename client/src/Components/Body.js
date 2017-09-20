import React, { Component } from 'react';

export default class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }

    }
    render() {
        return (<div>Body</div>);
    }
}
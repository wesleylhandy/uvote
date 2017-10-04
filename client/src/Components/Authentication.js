import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Login from './Login';
import Logout from './Logout';
import Signup from './Signup';
import { authUser, unAuthUser, newUser } from '../utils/helpers';

export default class Authentication extends Component {

    state={
        redirectToReferrer: false,
        username: '',
        password: ''
    }

    login=() => {
        authUser({username: this.state.username, password: this.state.password}).then(user => {
            this.setState({ redirectToReferrer: true })
        }).catch(err=> alert(err));
    }

    render() {
        const { from }=this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer }=this.state

        if (redirectToReferrer) {
            return ( <Redirect to={ from }/>
            )
        }

        return ( 
            <div>
                <p>You must log in to view the page at { from.pathname }</p> 
                <button onClick={ this.login }>Log in</button> 
            </div>
        )
    }
    
}
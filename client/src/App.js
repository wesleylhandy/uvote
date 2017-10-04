import React, { Component } from 'react';
import {
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import AllPolls from './Components/AllPolls';
import UserPortal from './Components/UserPortal';
//import Login from './Components/Login';
//import Logout from './Components/Logout';
//import Signup from './Components/Signup';
import { authUser, unAuthUser, newUser } from './utils/helpers';

//import io from 'socket.io-client';
//const socket = io();

let isAuth = false;

class Authentication extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirectToReferrer: false,
            username: '',
            password: ''
        }
        this.login = this.login.bind(this);
    }

    login = () => {
        authUser({username: this.state.username, password: this.state.password}).then(user => {
            isAuth = true;
            this.setState({ redirectToReferrer: true })
        }).catch(err=> alert(err));
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer }=this.state

        if (redirectToReferrer) {
            return ( <Redirect to={ from }/>
            )
        }
        const message = from.pathname == '/' ? 'Please Click Here to Login' : `You must log in to view the page at ${from.pathname}`;

        return ( 
            <div>
                <p>{message}</p> 
                <button onClick={ this.login }>Log in</button> 
            </div>
        )
    }
    
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isAuth ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default class App extends Component {
    render() {
        return ( 
            <nav>
                 <ul>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to="/polls">View All Polls</Link></li>
                    <li><Link to="/portal">Create Poll</Link></li>
                </ul>
                <Route path="/login" component={Authentication}/>
                <Route path="/polls" component={AllPolls}/>
                <PrivateRoute path="/portal" component={UserPortal}/>
            </nav>
        )
    }
}
import React, { Component } from 'react';
import {
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import AllPolls from './Components/AllPolls';
import SinglePoll from './Components/AllPolls';
import UserPortal from './Components/UserPortal';
import { authUser, unAuthUser, newUser } from './utils/helpers';

//import io from 'socket.io-client';
//const socket = io();
let isAuth = false;

class Authentication extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    login = () => {

        isAuth = true;
        /* 
        authUser({username: this.state.username, password: this.state.password}).then(user => {
            isAuth = true;
            this.setState({ redirectToReferrer: true })
        }).catch(err=> alert(err));
        */
    }

    logout = () => {
        isAuth = false;
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }

        if (isAuth) {
            return ( <Redirect to={ from }/>
            )
        }
        const message = from.pathname === '/' ? `Please Click Here to ${isAuth ? 'Log out' : 'Log in'}` : `You must log in to view the page at ${from.pathname}`;
        const text = isAuth ? 'Log out' : 'Log in';

        return ( 
            <div>
                <p>{ message }</p> 
                <button onClick={ !isAuth ? this.login : this.logout }>{ text }</button> 
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

    renderLoginControl = () => {
        if (isAuth) return <Link to='/logout'>Logout</Link>
        else return <Link to='/login'>Login</Link>
    }

    render() {
        return ( 
            <nav>
                 <ul>
                    <li>{this.renderLoginControl()}</li>

                    <li><Link to="/polls">View All Polls</Link></li>
                    <li><Link to="/portal">Create Poll</Link></li>
                </ul>
                <Route path='/logout' component={Authentication}/>
                <Route path="/login" component={Authentication}/>
                <Route path="/polls" component={AllPolls}/>
                <Route path="/polls/single/:id/:title" component={SinglePoll}/>
                <PrivateRoute path="/portal" component={UserPortal}/>
            </nav>
        )
    }
}
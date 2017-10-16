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
let globalAuth = false;

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
        this.props.updateAuth(true);
        /* 
        authUser({username: this.state.username, password: this.state.password}).then(user => {
            this.props.updateAuth(true);
        }).catch(err=> alert(JSON.stringify(err, null, 2)));
        */
    }

    logout = () => {
        this.props.updateAuth(false);
        /*
        unAuthUser().then(()=> this.props.updateAuth(false)).catch(err=> alert(JSON.stringify(err, null, 2)));
        */
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }

        // if (this.props.isAuth) {
        //     return ( <Redirect to={ from }/>
        //     )
        // }
        const message = from.pathname === '/' ? `Please Click Here to ${this.props.isAuth ? 'Log out' : 'Log in'}` : `You must log in to view the page at ${from.pathname}`;
        const text = this.props.isAuth ? 'Log out' : 'Log in';

        return ( 
            <div>
                <p>{ message }</p> 
                <button onClick={ !this.props.isAuth ? this.login : this.logout }>{ text }</button> 
            </div>
        )
    }
    
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    globalAuth ? (
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

    constructor(props) {
        super(props)
        this.state = {
            isAuth: false
        }
    }

    updateAuth(bool) {
        this.setState({isAuth: bool});
        globalAuth = bool;
    }

    renderLoginControl = () => {
        if (this.state.isAuth) return <Link to='/logout'>Logout</Link>
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
                <Route path='/log*' render={props=> <Authentication isAuth={this.state.isAuth} updateAuth={this.updateAuth.bind(this)} {...props}/>}/>
                <Route path="/polls" component={AllPolls}/>
                <Route path="/polls/single/:id/:title" component={SinglePoll}/>
                <PrivateRoute path="/portal" component={UserPortal}/>
            </nav>
        )
    }
}
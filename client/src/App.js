import React, { Component } from 'react';
import {
  Route,
  Link,
  Redirect
} from 'react-router-dom';

import Authentication from './Components/Authentication';
import SignUp from './Components/Signup';
import AllPolls from './Components/AllPolls';
import SinglePoll from './Components/AllPolls';
import UserPortal from './Components/UserPortal';

//import io from 'socket.io-client';
//const socket = io();
let globalAuth = false;

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

    renderLoginControl = (auth) => {
        if (auth) return <Link to='/logout'>Logout</Link>
        else return <div className='login-links'><Link to='/login'>Login</Link><Link to='/signup'>Signup</Link></div>
    }

    render() {
        return ( 
            <div>
                <header>
                    <nav>
                        <ul>
                            <li>{this.renderLoginControl(this.state.isAuth)}</li>

                            <li><Link to="/polls">View All Polls</Link></li>
                            <li className={this.state.isAuth? '' : 'hidden'}><Link to="/portal">Create Poll</Link></li>
                        </ul>
                    </nav>
                    <Route path='/log*' render={props=> <Authentication isAuth={this.state.isAuth} updateAuth={this.updateAuth.bind(this)} {...props}/>}/>
                    <Route path='/signup'render={props=> <SignUp isAuth={this.state.isAuth} updateAuth={this.updateAuth.bind(this)} {...props}/>}/>
                </header>
                <Route path="/polls" component={AllPolls}/>
                <Route path="/polls/single/:id/:title" component={SinglePoll}/>
                <PrivateRoute path="/portal" component={UserPortal}/>
            </div>
        )
    }
}
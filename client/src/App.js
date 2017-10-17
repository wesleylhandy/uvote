import React, { Component } from 'react';
import {
  Route,
  Link
} from 'react-router-dom';


import LogIn from './Components/LogIn';
import LogOut from './Components/LogOut';
import SignUp from './Components/Signup';
import AllPolls from './Components/AllPolls';
import SinglePoll from './Components/AllPolls';
import UserPortal from './Components/UserPortal';

export default class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isAuth: false,
            userId: null
        }
        this.updateAuth = this.updateAuth.bind(this);

    }

    updateAuth(bool, creatorId) {
        this.setState({isAuth: bool, userId: creatorId});
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
                            <li><Link to="/portal">User Portal</Link></li>
                        </ul>
                    </nav>
                    <Route path='/login' render={props=> <LogIn isAuth={this.state.isAuth} updateAuth={this.updateAuth} {...props}/>}/>
                    <Route path='/logout' render={props=> <LogOut isAuth={this.state.isAuth} updateAuth={this.updateAuth} {...props}/>}/>
                    <Route path='/signup'render={props=> <SignUp isAuth={this.state.isAuth} updateAuth={this.updateAuth} {...props}/>}/>
                </header>
                <main>
                    <div className="container">
                        <Route path="/polls" component={AllPolls}/>
                        <Route path="/polls/single/:id/:title" render={props=> <SinglePoll userId={this.state.userId} {...props}/>}/>
                        <Route path="/portal" render={props=> <UserPortal isAuth={this.state.isAuth} userId={this.state.userId} {...props}/>}/>
                    </div>
                </main>
                <footer>
                    <div className='container'></div>
                </footer>
            </div>
        )
    }
}
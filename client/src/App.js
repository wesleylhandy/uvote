import React, { Component } from 'react';
import {
  Route,
  Link,
  Switch
} from 'react-router-dom';
import moment from 'moment';


import LogIn from './Components/LogIn';
import LogOut from './Components/LogOut';
import SignUp from './Components/Signup';
import AllPolls from './Components/AllPolls';
import SinglePoll from './Components/SinglePoll';
import UserPortal from './Components/UserPortal';
import PortalMessage from './Components/PortalMessage';
import PollEditor from './Components/PollEditor';
import AllUserPolls from './Components/AllUserPolls';
import UserIncompletePolls from './Components/UserIncompletePolls';
import UserCompletePolls from './Components/UserCompletePolls';
import SearchPolls from './Components/SearchPolls';
import Home from './Components/Home';
import NoMatch from './Components/NoMatch';

import {getSession} from './utils/helpers';

export default class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isAuth: props.isAuth == "false" ? false : true,
            userId: props.userId,
            stars: 0
        }
        this.updateAuth = this.updateAuth.bind(this);
    }

    updateAuth(bool, creatorId) {
        this.setState({isAuth: bool, userId: creatorId});
    }


    renderLoginControl = (auth) => {
        if (auth) return <Link to='/logout'>Logout</Link>
        else return <div className='login-links'><Link to='/login'>Log In</Link><Link to='/signup'>Sign Up</Link></div>
    }

    renderPortal = (auth) => {
        if (auth) return <UserPortal isAuth={this.state.isAuth} userId={this.state.userId} />
        else return null;
    }

    componentDidMount() {
        getSession()
            .then(res=>{
                this.setState({userId: res.user, isAuth: res.isAuth})
            })
            .catch(err=>console.error(err));
        fetch('https://github.com/wesleylhandy/uvote').then(response=> response.json()).then(data=>{
            this.setState({stars: data.stargazers_count})
        });
    }

    render() {
        return ( 
            <div className='site flex flex-column'>
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
                <main className='flex-grow'>
                    {this.renderPortal(this.state.isAuth)}
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route exact path='/login' component={Home}/>
                            <Route exact path='/logout' component={Home}/>
                            <Route exact path='/signup' component={Home}/>
                            <Route exact path="/portal" render={props => <PortalMessage userId={this.state.userId} isAuth={this.state.isAuth} {...props}/>}/>
                            <Route exact path="/polls" component={AllPolls}/>
                            <Route path="/polls/single/:id/:title" render={props=> <SinglePoll userId={this.state.userId} isAuth={this.state.isAuth} {...props}/>}/>
                            <Route path="/edit/my/:pollId" render={props=> <PollEditor isAuth={this.state.isAuth} userId={this.state.userId} {...props}/>}/>
                            <Route exact path='/create/new' render={props => <PollEditor isAuth={this.state.isAuth} userId={this.state.userId} {...props}/>}/>
                            <Route exact path='/all/my' render={props => <AllUserPolls isAuth={this.state.isAuth} userId={this.state.userId} {...props}/>}/>
                            <Route exact path='/incomplete/my' render={props => <UserIncompletePolls isAuth={this.state.isAuth} userId={this.state.userId} {...props}/>}/>
                            <Route exact path='/complete/my' render={props => <UserCompletePolls isAuth={this.state.isAuth} userId={this.state.userId} {...props}/>}/>
                            <Route exact path='/search/:userId/:terms' render={props => <SearchPolls isAuth={this.state.isAuth} userId={this.state.userId} {...props}/>}/>
                            <Route path='/*' component={NoMatch}/>
                        </Switch>
                    </div>
                </main>
                <footer>
                    <div className='container'>
                        <div className="flex flex-row flex-around flex-wrap">
                            <div className='copyright-group'>
                                <i className="fa fa-copyright" aria-hidden="true"></i>&nbsp;{moment().format('YYYY')}&nbsp;<a href="http://www.wesleylhandy.net" target="_blank">Wesley L. Handy</a>
                            </div>
                            <div className='github-group'>
                                <a className="github-button" href="https://github.com/wesleylhandy/uvote" data-show-count="true" aria-label="Star ntkme/github-buttons on GitHub" target="_blank">Star</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}
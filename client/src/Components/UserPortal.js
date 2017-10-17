import React, { Component } from 'react';
import {Redirect, Link, Route} from 'react-router-dom';

import CreatePoll from './CreatePoll';
import AllUserPolls from './AllUserPolls';
import UserIncompletePolls from './UserIncompletePolls';
import UserCompletePolls from './UserCompletePolls';
import SearchPolls from './SearchPolls';

export default class UserPortal extends Component {
    constructor(props) {
        super(props);
        this.state={
            userId: '',
            isAuth: '',
            searchTerm: ''
        }
    }
    componentDidMount(){
        this.setState({userId: this.props.userId, isAuth: this.props.isAuth});
    }
    render() {
        if(this.props.userId && this.props.isAuth) {
            return (
                <section className='portal-section'>
                    <p>You're creator ID is {this.state.userId}. All of the polls you create will be saved under this id and can be viewd by the public. You will be able to share your polls with your friends once they are created.</p>
                    <div className="user-options">
                        <Link to={`/create/${this.state.userId}`}><button className="option-create">Create Poll <i className="fa fa-certificate" aria-hidden="true"></i></button></Link>
                        <Link to={`/all/${this.state.userId}`}><button className="option-view-all">All My Polls <i className="fa fa-folder" aria-hidden="true"></i></button></Link>
                        <Link to={`/incomplete/${this.state.userId}`}><button className="option-view-incomplete">Unsaved Polls <i className="fa fa-unlock-alt" aria-hidden="true"></i></button></Link>
                        <Link to={`/saved/${this.state.userId}`}><button className="option-view-complete">Saved Polls <i className="fa fa-lock" aria-hidden="true"></i></button></Link>
                        <div className="input-group">
                            <label htmlFor="search"><i className="fa fa-search" aria-hidden="true"></i></label>
                            <input type="text" placeholder='term...' onChange={handleInput} value={this.state.searchTerm}/>
                            <button className="search-all">Search</button>
                        </div>
                    </div>
                    <Route path='/create/:userId' render={props=> <CreatePoll isAuth={this.state.isAuth} {...props}/>}/>
                    <Route path='/all/:userId' render={props=> <AllUserPolls isAuth={this.state.isAuth} {...props}/>}/>
                    <Route path='/incomplete/:userId' render={props=> <UserIncompletePolls isAuth={this.state.isAuth} {...props}/>}/>
                    <Route path='/complete/:userId' render={props=> <UserCompletePolls isAuth={this.state.isAuth} {...props}/>}/>
                    <Route path='/search/:userId/:terms' render={props => <SearchPolls isAuth={this.state.isAuth} {...props}/>}/>
                </section>
            );
        
        } else return <Redirect to={{
            pathname: '/login',
            state: { from: {pathname: '/portal' }}
        }}/>
        
    }
}
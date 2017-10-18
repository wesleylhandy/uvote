import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';

export default class UserPortal extends Component {
    constructor(props) {
        super(props);
        this.state={
            userId: '',
            isAuth: '',
            searchTerm: ''
        }
        this.handleInput.bind(this);
    }
    componentDidMount(){
        this.setState({userId: this.props.userId, isAuth: this.props.isAuth});
    }

    handleInput(e) {
        e.preventDefault();
    }

    render() {
        if(this.props.userId && this.props.isAuth) {
            return (
                <section className='portal-section'>
                    <div>You're creator ID is {this.state.userId}. All of the polls you create will be saved under this id and can be viewd by the public. You will be able to share your polls with your friends once they are created.</div>
                    <div className="user-options">
                        <Link to={'/create/new'}><button className="option-create">Create Poll <i className="fa fa-certificate" aria-hidden="true"></i></button></Link>
                        <Link to={'/all/my'}><button className="option-view-all">All My Polls <i className="fa fa-folder" aria-hidden="true"></i></button></Link>
                        <Link to={'/incomplete/my'}><button className="option-view-incomplete">Unsaved Polls <i className="fa fa-unlock-alt" aria-hidden="true"></i></button></Link>
                        <Link to={'/saved/my'}><button className="option-view-complete">Saved Polls <i className="fa fa-lock" aria-hidden="true"></i></button></Link>
                        <div className="input-group">
                            <label htmlFor="search"><i className="fa fa-search" aria-hidden="true"></i></label>
                            <input type="text" placeholder='term...' onChange={this.handleInput} value={this.state.searchTerm}/>
                            <button className="search-all">Search</button>
                        </div>
                    </div>
                    
                </section>
            );
        
        } else return <Redirect to={{
            pathname: '/login',
            state: { from: {pathname: '/portal' }}
        }}/>
        
    }
}
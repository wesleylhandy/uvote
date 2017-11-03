import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class UserPortal extends Component {
    constructor(props) {
        super(props);
        this.state={
            userId: props.userId,
            isAuth: props.isAuth,
            searchTerm: ''
        }
        this.handleInput.bind(this);
    }

    handleInput(e) {
        e.preventDefault();
    }

    render() {
            return (
                <section className='portal-section'>
                    
                    <div className="user-options">
                        <Link to={'/create/new'}><button className="option-create">Create Poll <i className="fa fa-certificate" aria-hidden="true"></i></button></Link>
                        <Link to={'/all/my'}><button className="option-view-all">All My Polls <i className="fa fa-folder" aria-hidden="true"></i></button></Link>
                        <Link to={'/incomplete/my'}><button className="option-view-incomplete">Incomplete Polls <i className="fa fa-unlock-alt" aria-hidden="true"></i></button></Link>
                        <Link to={'/complete/my'}><button className="option-view-complete">Active Polls <i className="fa fa-lock" aria-hidden="true"></i></button></Link>
                        <div className="input-group">
                            <input type="text" placeholder='term...' onChange={this.handleInput} value={this.state.searchTerm}/>
                            <button className="search-all">Search&nbsp;<i className="fa fa-search" aria-hidden="true"></i></button>
                        </div>
                    </div>

                </section>
            );        
    }
}
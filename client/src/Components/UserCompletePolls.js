import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {getUsersCompletePolls} from '../utils/helpers';

export default class AllMyPolls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            polls: [],
            userId: props.userId,
            isAuth: props.isAuth
        }
        this.renderPolls.bind(this);
    }

    componentDidMount() {
        if(this.state.userId) {
            getUsersCompletePolls(this.state.userId, this.state.isAuth).then(res => {
                    this.setState({polls: res.polls});
               }).catch(err=> alert(JSON.stringify(err, null, 2)));
        }
    }

    renderPolls(polls) {
        if(polls && polls.length) return (
                <ul>
                    {
                        polls.map((poll, index)=> {
                            return (
                                <li key={index}>
                                    <Link to={poll.url}>{poll.title}</Link>
                                    <span> Status - {poll.status}</span>
                                </li>
                            )
                            
                        })
                    }
                </ul>
            )
        else return <p>You do not have any active polls. Please <Link to='/create/new'>Click Here</Link> to create a new poll, or <Link to='/incomplete/my'>Here</Link> to view your incomplete polls.</p>
    }

    render() {
        return ( <section className='polls-list-section'>{this.renderPolls(this.state.polls)}</section> );
        
    }
}
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {getAllMyPolls} from '../utils/helpers';

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
            getAllMyPolls(this.state.userId, this.state.isAuth).then(res => {
                    this.setState({polls: res.polls});
               }).catch(err=> alert(JSON.stringify(err, null, 2)));
           }
    }

    renderPolls(polls) {
        if(polls && polls.length) return (
                <ul>
                    {
                        polls.map((poll, index)=> {
                            if(poll.status === 'complete') {
                                return (
                                    <li key={index}>
                                        <Link to={poll.url}>{poll.title}</Link>
                                        <span> Status - {poll.status}</span>
                                    </li>
                                )
                            } else { 
                                const endpoint = `/edit/my/${poll._id}`
                                return (
                                    <li key={index}>
                                        <Link to={endpoint}>{poll.hasOwnProperty('title') ? poll.title : poll._id}</Link>
                                        <span> Status - {poll.status}</span>
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
            )
        else return <p>You have not yet created any polls. Please <Link to='/create/new'>Click Here</Link> to create your first poll.</p>
    }

    render() {
        return ( <section className='polls-list-section'>{this.renderPolls(this.state.polls)}</section> );
        
    }
}
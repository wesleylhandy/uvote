import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {getAllUsersPolls} from '../utils/helpers';

export default class AllPolls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            polls: []
        }
    }

    componentDidMount() {
        getAllUsersPolls().then(res => {
            this.setState({polls: res.polls})
        }).catch(err=> alert(JSON.stringify(err, null, 2)));
    }

    renderPolls(polls) {
        if(polls && polls.length) return (
                <ul>
                    {
                        polls.map((poll, index)=> {
                            return <li key={index}><Link to={poll.polls.url}>{poll.polls.title}</Link></li>
                        })
                    }
                </ul>
            )
        else return <p>There are currently no saved polls. Please login or create an account to add the first poll.</p>
    }

    render() {
        return ( 
            <section className='polls-list-section'>
                <h1>All Polls</h1>
                {this.renderPolls(this.state.polls)}
            </section> );
        
    }
}
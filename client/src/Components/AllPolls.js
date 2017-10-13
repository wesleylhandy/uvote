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
        getAllUsersPolls().then(polls => this.setState({polls})).catch(err=> alert(err));
    }

    renderPolls(polls) {
        if(polls)
            return (
                <ul>
                    {
                        polls.map((poll, index)=> <li key={index}><Link to={poll.url}>{poll.title}</Link></li> )
                    }
                </ul>
            )
    }

    render() {
        return ( <div>{this.renderPolls(this.state.polls)}</div> );
        
    }
}
import React, { Component } from 'react';
import {Doughnut} from 'react-chartjs-2';
import shortid from 'shortid';

import {getSession, getSinglePoll, vote, guestUser} from '../utils/helpers';
import TwitterLogo from './TwitterLogo.js';

export default class Poll extends Component {
    constructor(props){
        super(props);
        this.state = {
            creatorId: props.match.params.id,
            title: props.match.params.title,
            poll: null,
            url: '',
            userId: props.userId,
            isAuth: props.isAuth,
            hasVoted: false,
            optionChecked: null
        }
        this.renderInputs = this.renderInputs.bind(this);
        this.renderChart = this.renderChart.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleVote = this.handleVote.bind(this);
        this.updatePollData = this.updatePollData.bind(this);
    }

    updatePollData() {
        //get poll data on mount or after vote
        getSinglePoll(this.state.creatorId, this.state.title)
            .then(res=>{
                const hasVoted = this.state.hasVoted || res.poll.voters.includes(this.state.userId) ? true : false;
                this.setState({poll: res.poll, hasVoted: hasVoted, url: res.poll.url});
            })
            .catch(err=>alert(JSON.stringify(err, null, 2)));
    }
    componentDidMount() {
        getSession()
            .then(res => {
                this.setState({ userId: res.user, isAuth: res.isAuth });
                if (!this.state.userId) {
                    const userId = `guest${shortid.generate()}`;
                    guestUser(userId)
                        .then(res => this.setState({ userId: userId, isAuth: false }))
                        .catch(err => alert(JSON.stringify(err, null, 2)))
                }
            })
            .catch(err => console.error(err));
        
        this.updatePollData();
    }
    renderInputs(poll) {
        if (poll && !this.state.hasVoted) {
            return (
                <form onSubmit={this.handleVote}>
                    {poll.inputs.map((input, index)=> (
                        <div className={this.state.optionChecked === input._id ? 'input-group checked' : 'input-group'} key={index}>
                            <label htmlFor={input._id}>{input.title}</label>
                            <input type='radio' 
                                value={input.title} 
                                name={input._id} 
                                disabled={this.state.hasVoted} 
                                checked={this.state.optionChecked === input._id ? true: false}
                                onChange={this.handleOptionChange}
                            />
                        </div>
                    ))}
                    <button type='submit'>Submit</button>
                </form>
            )
        } else return <div className='no-data'>Poll could not be found in the database. It is possible the creator deleted the poll.</div>
    }
    renderChart(poll){
        if (poll) {
            let votes = 0;
            var obj = {
                labels: [],
                colors: [],
                data: []
            };

            poll.inputs.forEach((input, ind, arr)=>{
                obj.labels.push(input.title);
                obj.colors.push(`hsla(${((360 / arr.length) * ind) + 20}, 100%, 45%, 0.9)`);
                obj.data.push(input.votes);
                votes += input.votes;
            });

            const data = {
                datasets: [{
                    data: obj.data,
                    backgroundColor: obj.colors,
                }],
                labels: obj.labels
            }
            if (votes) return <div className='poll-visualization'><Doughnut data={data} ref='chart' width={400} height={400}/></div>
        
        } else {
            //this should never return....
            ///but...
            return <div className='no-data'>No Data is Available for the poll at {this.props.history.location.pathname}</div>
        }
    }

    handleOptionChange(e) {
        this.setState({
            optionChecked: e.target.name
        });
    }

    handleVote(e) {
        e.preventDefault();

        vote(this.state.title, this.state.optionChecked, this.state.creatorId, this.state.userId).then(res=>{
            this.setState({hasVoted:true});
            this.updatePollData();
        }).catch(err=>alert(JSON.stringify(err, null, 2)));
    }
    render() {
        
        return (
            <section className='poll'>
                <div className='poll-title'>{decodeURIComponent(this.state.title)}</div>
                <div className="poll-container">
                    {this.renderInputs(this.state.poll)}
                    <hr className={this.state.hasVoted ? '' : 'hidden'}/>
                    {this.renderChart(this.state.poll)}
                    <hr />
                    <a className="tweet-container" href={`https://twitter.com/intent/tweet?text=${this.state.title}&url=https://u-vote.herokuapp.com${this.state.url}&hashtags=onlinepoll`}>
                        <TwitterLogo />
                        <div className="tweet-cta">Tweet This Poll</div>
                    </a>
                </div>
            </section>
        )
    }
}
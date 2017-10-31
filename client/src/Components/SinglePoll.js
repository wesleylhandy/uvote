import React, { Component } from 'react';
import {Doughnut} from 'react-chartjs-2';

import {getSession, getSinglePoll, vote} from '../utils/helpers';

export default class Poll extends Component {
    constructor(props){
        super(props);
        this.state = {
            creatorId: props.match.params.id,
            title: props.match.params.title,
            poll: null,
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
                this.setState({poll: res.poll, hasVoted: hasVoted});
            })
            .catch(err=>alert(JSON.stringify(err, null, 2)));
    }
    componentDidMount() {
        //check session for user and update
        getSession()
            .then(res=>{
                this.setState({userId: res.user, isAuth: res.isAuth})
                this.updatePollData();
            })
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
        } else if (poll && this.state.hasVoted) {
            return (
                <div className='poll-display'>
                    {
                        poll.inputs.map((input, index)=>{
                            return (
                                <div className='option-display-group' key={index}>
                                    <div>{input.title} - Votes: {input.votes}</div>
                                </div>
                            )
                        })
                    }
                </div>
            )
        } else return <div>Poll could not be found in the database. It is possible the creator deleted the poll.</div>
    }
    renderChart(poll){
        if (poll) {
            var obj = {
                labels: [],
                colors: [],
                data: []
            };

            poll.inputs.forEach((input, ind, arr)=>{
                obj.labels.push(input.title);
                obj.colors.push(`hsla(${((360 / arr.length) * ind) + 20}, 100%, 45%, 0.9)`);
                obj.data.push(input.votes);
            });

            const data = {
                datasets: [{
                    data: obj.data,
                    backgroundColor: obj.colors,
                }],
                labels: obj.labels
            }

            return <div className='poll-visualization'><Doughnut data={data} ref='chart' width={400} height={400}/></div>
        
        } else {
            //this should never return....
            ///but...
            return <p>No Data is Available for the poll at {this.props.history.location.pathname}</p>
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
            <div className='poll'>
                <div className='poll-title'>{decodeURIComponent(this.state.title)}</div>
                <div className="poll-container">
                    {this.renderInputs(this.state.poll)}
                    {this.renderChart(this.state.poll)}
                </div>
            </div>
        )
    }
}
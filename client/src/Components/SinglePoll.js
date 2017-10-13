import React, { Component } from 'react';

import {getSinglePoll} from '../utils/helpers';

export default class Poll extends Component {
    constructor(props){
        super(props);
        this.state = {
            creatorId: props.match.params.id,
            title: props.match.params.title,
            poll: {},
            hasVoted: false
        }
        this.renderInputs = this.renderInputs.bind(this);
        this.renderChart = this.renderChart.bind(this);
        this.handleVote = this.handleVote.bind(this);
    }
    componentDidMount() {
        getSinglePoll(this.state.creatorId, this.state.title).then(poll=>this.setState({poll})).catch(err=>alert(err));
    }
    renderInputs(poll) {
        if (poll)
            return (
                <form>
                    {poll.inputs.map((input, index)=><input key={index} type='radio' value={input.title} name={input._id}/>)}
                    <button onClick={this.handleVote}>Submit</button>
                </form>
            )
    }
    renderChart(poll){

    }
    handleVote(e) {
        e.preventDefault();
    }
    render() {
        const renderFunction = !this.state.hasVoted ? this.renderInputs : this.renderChart;
        return (
            <div className = 'poll'>
                <div className = 'poll-title'>{this.state.title}></div>
                {
                    renderFunction(this.state.poll)
                }
            </div>
        )
    }
}
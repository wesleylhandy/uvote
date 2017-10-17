import React, { Component } from 'react';
import {Doughnut as DoughnutChart} from 'react-chartjs';

import {getSinglePoll, vote} from '../utils/helpers';

export default class Poll extends Component {
    constructor(props){
        super(props);
        this.state = {
            creatorId: props.match.params.id,
            title: props.match.params.title,
            poll: {},
            userId: this.props.userId,
            hasVoted: false
        }
        this.renderInputs = this.renderInputs.bind(this);
        this.renderChart = this.renderChart.bind(this);
        this.handleVote = this.handleVote.bind(this);
        this.updatePollData = this.updatePollData.bind(this);
    }

    updatePollData() {
        getSinglePoll(this.state.creatorId, this.state.title).then(poll=>this.setState({poll})).catch(err=>alert(err));
    }
    componentDidMount() {
        this.updatePollData();
    }
    renderInputs(poll) {
        if (poll && !this.state.hasVoted)
            return (
                <form>
                    {poll.inputs.map((input, index)=><input key={index} type='radio' value={input.title} name={input._id} disabled={this.state.hasVoted}/>)}
                    <button onClick={this.handleVote}>Submit</button>
                </form>
            )
    }
    renderChart(poll){
        if (poll) {
            var data = {
                labels: [],
                colors: []

            };
            poll.inputs.forEach((input, ind, arr)=>{
                data.labels.push(input.title);
                data.colors.push(`hsla(${((360 / arr.length) * ind) + 20}, 100%, 45%, 0.9)`);
            });
            return <DoughnutChart data={data} options={}/>
        }
        return <p>No Data is Available for this Poll</p>
    }
    handleVote(e) {
        e.preventDefault();
        vote(this.state.title, e.target.name, this.state.creatorId, this.state.userId).then(res=>{
            this.setState({hasVoted:true});
            this.updatePollData();
        }).catch(err=>alert(err));
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
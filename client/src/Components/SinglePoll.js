import React, { Component } from 'react';
import {Doughnut as DoughnutChart} from 'react-chartjs';

import {getSinglePoll, vote} from '../utils/helpers';

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
            hasPollData: false,
            optionChecked: null
        }
        this.renderInputs = this.renderInputs.bind(this);
        this.renderChart = this.renderChart.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleVote = this.handleVote.bind(this);
        this.updatePollData = this.updatePollData.bind(this);
    }

    updatePollData() {
        getSinglePoll(this.state.creatorId, this.state.title)
            .then(res=>{
                this.setState({poll: res.poll, hasPollData: true})
            })
            .catch(err=>alert(JSON.stringify(err, null, 2)));
    }
    componentDidMount() {
        this.updatePollData();
    }
    renderInputs(poll) {
        if (poll && !this.state.hasVoted) {
            return (
                <form onSubmit={this.handleVote}>
                    {poll.inputs.map((input, index)=> (
                        <div className='input-group' key={index}>
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
        } else if (poll & this.state.hasVoted) {
            this.renderChart(poll);
        } else return 
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
            return <DoughnutChart data={data}/>
        }
        return <p>No Data is Available for this Poll</p>
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
                {this.renderInputs(this.state.poll)}
            </div>
        )
    }
}
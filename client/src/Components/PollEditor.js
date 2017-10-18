import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { createPoll, deletePoll, addTitle } from '../utils/helpers';
//, addOption, savePoll, changeOptionOrder, deleteOption, 

const dummyOptions = {
    0: 'Captain Kirk',
    1: 'Captain Picard',
    2: "Cap'n Crunch",
    3: 'Captain Hook',
    4: 'Captain Jack Sparrow',
    5: 'Captain America',
    6: 'Captain Morgan',
    7: 'Captain Kangaroo',
    8: 'Captian Caveman',
    9: 'Captain John Miller',
    10: 'Captain Ahab',
    11: 'Enough Already',
    12: 'Seriously?!?',
    13: 'Okay, just one more...NOT!!!',
    14: "Something ain't right here...",
    15: 'Stop',
    16: 'Did you hear what I said, no more - PLEASE!??',
    25: 'You win the prize for least user friendly poll ever!'
}

export default class PollEditor extends Component {
    constructor(props){
        super(props);
        this.state = {
            userId: this.props.userId,
            title: '',
            isAuth: this.props.isAuth,
            options: [],
            pollId: ''
        }
        this.handleTitleSave = this.handleTitleSave.bind(this);
        this.handleDeletePoll = this.handleDeletePoll.bind(this);
        this.addOptionInput = this.addOptionInput.bind(this);
        this.handleOptionSave = this.handleOptionSave.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    /*** SPECIFIC EVENT HANDLERS ***/
    // TITLE
    handleTitleSave(e) {
        e.preventDefault();
        console.log({pollId: this.state.pollId});
        addTitle(this.state.userId, this.state.pollId, this.state.title, this.state.isAuth)
        .then(success=>console.log('Title Saved'))
        .catch(err=>console.error(err));
    }

    handleDeletePoll(e) {
        e.preventDefault();
        deletePoll(this.state.pollId, this.state.userId, this.state.isAuth)
        .then(success=>console.log('Poll Deleted'))
        .catch(err=>console.error(err));
    }

    //OPTIONS
    addOptionInput(e){
        e.preventDefault();
        const option = {
            order: this.state.options.length,
            title: ''
        }
        const arr = this.state.options.slice();
        arr.push(option);
        this.setState({options: arr});
    }
    handleOptionSave(e){
        e.preventDefault();
    }

    handleDeleteOption(e) {
        e.preventDefault();
    }

    /*** GENERAL EVENT HANDLERS ***/
    handleInput(e){
        e.preventDefault();
        if (e.target.name === 'title') {
            this.setState({title: e.target.value});
        } else {
            const options = this.state.options;
            options[e.target.name].title = e.target.value;
            this.setState({options: options});
        }
    }

    handleClear(e){
        e.preventDefault();
    }

    componentDidMount() {
        if (this.props.pollData !== 'none') {
            const inputs = this.props.pollData.inputs || [];
            inputs.sort(function(a, b) {
                return parseInt(a.order, 10) > parseInt(b.order, 10)
            });
            this.setState({title: this.props.pollData.title, options: inputs});
        }
        if (this.props.pollData==='none') {
            createPoll(this.props.userId, this.props.isAuth)
            .then(res=>this.setState({pollId: res.poll._id}))
            .catch(err=>console.error(err));
        }
    }
    renderOptions(inputs) {
        if (inputs) {
            return (
                <div className="editor-inputs">
                { inputs.map((input, index)=>{
                        return (
                            <div className="option-input-group" key={index}>
                                <label htmlFor={input._id || input.order}>Order {parseInt(input.order, 10) + 1}</label>
                                <input type='text' value={input.title} name={input._id || input.order} onChange={this.handleInput} placeholder={index < 17 || index !== 25 ? dummyOptions[index] : 'I give in, just keep adding as many as you like'}/>
                                <button onClick={this.handleOptionSave}>Save <i className="fa fa-floppy-o" aria-hidden="true"></i></button>
                                <button onClick={this.handleClear}>Clear <i className="fa fa-eraser" aria-hidden="true"></i></button>
                                <button onClick={this.handleDeleteOption}>Delete <i className="fa fa-trash-o" aria-hidden="true"></i></button>
                            </div>
                        )
                  })
                }
                </div>
            )
        }
    }

    render() {
        if(this.props.userId && this.props.isAuth) {
            return (
                <div className='poll-editor'>
                    <div className="title-input-group">
                        <label htmlFor="title">Title <i className="fa fa-question" aria-hidden="true"></i></label>
                        <input type="text" value={this.state.title} name='title' placeholder='Who do you want to be your captain?' onChange={this.handleInput}/>
                        <button onClick={this.handleTitleSave}>Save <i className="fa fa-floppy-o" aria-hidden="true"></i></button>
                        <button onClick={this.handleClear}>Clear <i className="fa fa-eraser" aria-hidden="true"></i></button>
                        <button onClick={this.handleDeletePoll}>Delete Poll <i className="fa fa-trash-o" aria-hidden="true"></i></button>
                    </div>
                    <div className="option-inputs">
                        {this.renderOptions(this.state.options)}
                        <button onClick={this.addOptionInput}>New Option <i className="fa fa-plus-square-o" aria-hidden="true"></i></button>
                    </div>
                </div>
            )
        } else return <Redirect to={{
            pathname: '/login',
            state: { from: {pathname: '/create/my' }}
        }}/>
    }
}
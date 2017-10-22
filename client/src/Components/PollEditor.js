import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { createPoll, deletePoll, savePoll, addTitle, addOption, deleteOption } from '../utils/helpers';

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
            titleSaved: false,
            pollURL: '',
            pollSaved: false,
            isAuth: this.props.isAuth,
            options: [],
            pollId: ''
        }
        this.handleTitleSave = this.handleTitleSave.bind(this);
        this.handleDeletePoll = this.handleDeletePoll.bind(this);
        this.handleSavePoll = this.handleSavePoll.bind(this);
        this.addOptionInput = this.addOptionInput.bind(this);
        this.handleOptionSave = this.handleOptionSave.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    /*** SPECIFIC EVENT HANDLERS ***/
    // TITLE
    handleTitleSave(e) {
        e.preventDefault();

        addTitle(this.state.userId, this.state.pollId, this.state.title, this.state.isAuth)
            .then(res=>{console.log('Title Saved'); this.setState({titleSaved: true, pollURL:res.poll.url })})
            .catch(err=>console.error(err));
    }

    handleDeletePoll(e) {
        e.preventDefault();

        deletePoll(this.state.pollId, this.state.userId, this.state.isAuth)
            .then(success=>console.log('Poll Deleted')) //redirect somewhere...
            .catch(err=>console.error(err));
    }

    handleSavePoll(e) {
        e.preventDefault()

        savePoll(this.state.userId, this.state.pollId, this.state.isAuth)
            .then(success=>{ console.log('Poll Saved'); this.setState({pollSaved: true})})
            .catch(err=>console.error(err));
    }

    //OPTIONS
    addOptionInput(e){
        e.preventDefault();
        
        const option = {
            order: this.state.options.length ? this.state.options[this.state.options.length - 1].order + 1 : 0,
            title: ''
        }
        const arr = this.state.options.slice();
        arr.push(option);
        this.setState({options: arr});
    }
    handleOptionSave(e){
        e.preventDefault();

        const index = e.target.name;
        const options = this.state.options;
        const option = options[index];

        if(option.title.trim()) {
        
            addOption(this.state.userId, this.state.pollId, option, this.state.isAuth)
                .then(res=>{
                    options[index].saved = true; 
                    this.setState({options: options});
                    console.log('Option Saved');
                })
                .catch(err=>console.error(err));
        } else {alert("Please Enter A Term or Phrase Before Saving.")}
    }

    handleDeleteOption(e) {
        e.preventDefault();
        //console.dir(e.target);
        const options = this.state.options;
        // the following regex will return false if e.target.name is a integer or string of real numbers
        //console.log({name: e.target.parentNode.name, test: (/([^0-9])+/igm).test(e.target.name)})
        if (!(/([^0-9])+/igm).test(e.target.parentNode.name))  {
            options.splice(parseInt(e.target.parentNode.name, 10), 1);
            this.setState({options: options});
        } else {
            deleteOption(this.state.userId, this.state.pollId, e.target.parentNode.name, this.state.isAuth)
                .then(success=>{
                    const index = options.findIndex(function(option){ return option._id === e.target.name});
                    if (index > -1) {
                        options.splice(index, 1);
                        this.setState({options: options});
                    }
                })
                .catch(err=>console.error(err));
        }
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
        if (e.target.name === 'title') {
            this.setState({title: ''});
        } else {
            const options = this.state.options;
            options[e.target.name].title = '';
            this.setState({options: options});
        }
    }

    /*** LIFECYCLE EVENTS ***/

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
                                <label htmlFor={input.saved ? "saved" + index : index}>Order {index + 1}</label>
                                <input 
                                    type='text' 
                                    value={input.title} 
                                    name={input.saved ? "saved" + index : index} 
                                    onChange={this.handleInput} 
                                    placeholder={index < 17 || index === 25 ? dummyOptions[index] : 'I give in, just keep adding as many as you like'}
                                    disabled={input.saved ? true : false}
                                />
                                <button className={input.saved ? 'hidden' : ''} onClick={this.handleOptionSave} name={input.saved ? "saved" + index : index}>Save <i className="fa fa-floppy-o" aria-hidden="true"></i></button>
                                <button className={input.saved ? 'hidden' : ''} onClick={this.handleClear} name={input.saved ? "saved" + index : index}>Clear <i className="fa fa-eraser" aria-hidden="true"></i></button>
                                <button onClick={this.handleDeleteOption} name={input.saved ? "saved"  + index : index}>Delete <i className="fa fa-trash-o" aria-hidden="true"></i></button>
                            </div>
                        )
                  })
                }
                </div>
            )
        }
    }

    renderSaveButton(options){
        let len = 0;
        for(let i=0; i < options.length; i++) {
            if (options[i].saved) len ++
            if(len > 1) return <button onClick={this.handleSavePoll}>Save Poll <i className="fa fa-floppy-o" aria-hidden="true"></i></button>
        }
        return        
    }

    render() {
        if(this.props.userId && this.props.isAuth) {
            if(!this.state.pollSaved) {
                return (
                    <div className='poll-editor'>
                        <div className="title-input-group">
                            <label htmlFor="title">Title <i className="fa fa-question" aria-hidden="true"></i></label>
                            <input 
                                type="text" 
                                value={this.state.title} 
                                name='title' 
                                placeholder='Who do you want to be your captain?' 
                                onChange={this.handleInput} 
                                disabled={this.state.titleSaved ? true : false}
                            />
                            <button className={this.state.titleSaved ? 'hidden' : ''} onClick={this.handleTitleSave}>Save <i className="fa fa-floppy-o" aria-hidden="true"></i></button>
                            <button className={this.state.titleSaved ? 'hidden' : ''} onClick={this.handleClear} name='title'>Clear <i className="fa fa-eraser" aria-hidden="true"></i></button>
                            
                        </div>
                        <div className="option-inputs">
                            {this.renderOptions(this.state.options)}
                            <div className="poll-controls">
                                <button onClick={this.addOptionInput}>New Option <i className="fa fa-plus-square-o" aria-hidden="true"></i></button>
                                {this.renderSaveButton(this.state.options)}
                                <button onClick={this.handleDeletePoll}>Delete Poll <i className="fa fa-trash-o" aria-hidden="true"></i></button>
                            </div>
                        </div>
                    </div>
                )
            } else return <Redirect to={{
                pathname: this.state.pollURL,
                state: { from: {pathname: this.props.location}}
            }}/>
        } else return <Redirect to={{
            pathname: '/login',
            state: { from: {pathname: this.props.location }}
        }}/>
    }
}
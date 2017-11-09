import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { getUnsavedPoll, createPoll, deletePoll, savePoll, addTitle, addOption, deleteOption } from '../utils/helpers';

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
            userId: props.userId,
            title: '',
            titleSaved: false,
            pollURL: '',
            pollSaved: false,
            isAuth: props.isAuth,
            options: [],
            numSavedOptions: 0,
            pollId: props.match.params.pollId || '',
            pollDeleted: false
        }
        this.handleTitleSave = this.handleTitleSave.bind(this);
        this.handleDeletePoll = this.handleDeletePoll.bind(this);
        this.handleSavePoll = this.handleSavePoll.bind(this);
        this.addOptionInput = this.addOptionInput.bind(this);
        this.handleOptionSave = this.handleOptionSave.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.updatePollData = this.updatePollData.bind(this);
        this.handleReturn = this.handleReturn.bind(this);
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
            .then(res=>this.setState({pollDeleted: true}))
            .catch(err=>console.error(err));
    }

    handleSavePoll(e) {
        e.preventDefault()

        savePoll(this.state.userId, this.state.pollId, this.state.isAuth)
            .then(success=>this.setState({pollSaved: true}))
            .catch(err=>console.error(err));
    }

    //OPTIONS
    addOptionInput(e){
         
        const option = {
            order: this.state.options.length ? this.state.options[this.state.options.length - 1].order + 1 : 0,
            title: ''
        }
        const arr = this.state.options.slice();
        arr.push(option);
        this.setState({options: arr});
    }
    handleOptionSave(e){
        const index = parseInt(e.hasOwnProperty('target') ? e.target.parentNode.id.replace('save', '') : e, 10);
        const options = this.state.options;
        const option = options[index];

        if(option.title.trim()) {
        
            addOption(this.state.userId, this.state.pollId, option, this.state.isAuth)
                .then(res=>{
                    this.updatePollData(this.state.userId, this.state.pollId);
                })
                .catch(err=>console.error(err));
        } else {alert("Please Enter A Term or Phrase Before Saving.")}
    }

    handleDeleteOption(e) {
        const options = this.state.options;
        // the following regex will return false if e.target.name is a integer or string of real numbers
        //console.log({name: e.target.parentNode.name, test: (/([^0-9])+/igm).test(e.target.name)})
        if (!(/([^0-9])+/igm).test(e.target.name))  {
            options.splice(parseInt(e.target.name, 10), 1);
            this.setState({options: options});
        } else {
            let inputId = e.target.id;
            deleteOption(this.state.userId, this.state.pollId, inputId, this.state.isAuth)
                .then(res=>this.updatePollData(this.state.userId, this.state.pollId))
                .catch(err=>console.error(err));
        }
    }

    /*** GENERAL EVENT HANDLERS ***/
    handleReturn(e){
        if(e.target.name === 'title' && e.key === "Enter" ) {
            e.preventDefault();
            return this.handleTitleSave(e.target.name);
        } else if (e.key === "Enter" ) {
            e.preventDefault();
            return this.handleOptionSave(e.target.name);
        }
    }

    handleInput(e){
        e.preventDefault();
        console.log({input:e.target});
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

    updatePollData(userId, pollId){
        getUnsavedPoll(userId, pollId).then(res => {
            let title = res.poll && res.poll.hasOwnProperty('title') ? res.poll.title : '';
            let titleSaved = title ? true : false;
            let pollURL = res.poll && res.poll.hasOwnProperty('url') ? res.poll.url : '';
            let numSavedOptions = res.poll.inputs.length;
            for (let i = 0; i < numSavedOptions; i++) {
                res.poll.inputs[i].saved = true;
            }
            this.setState({ title: title, titleSaved: titleSaved, pollURL: pollURL, options: res.poll.inputs, pollId: res.poll._id, numSavedOptions: numSavedOptions });
        }).catch(err => console.error(err));
    }

    /*** LIFECYCLE EVENTS ***/

    componentDidMount() {
        if (this.props.match.params.pollId) {
            this.updatePollData(this.state.userId, this.props.match.params.pollId);
        } else {
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
                                    onKeyDown={this.handleReturn}
                                    onChange={this.handleInput} 
                                    placeholder={index < 17 || index === 25 ? dummyOptions[index] : 'I give in, just keep adding as many as you like'}
                                    disabled={input.saved ? true : false}
                                />
                                <button id={'save' + index} className={input.saved ? 'hidden' : 'save-button'} onClick={this.handleOptionSave} name={input.saved ? "saved" + index : index}><i className="fa fa-floppy-o" aria-hidden="true"></i></button>
                                <button className={input.saved ? 'hidden' : 'clear-button'} onClick={this.handleClear} name={input.saved ? "saved" + index : index}><i className="fa fa-eraser" aria-hidden="true"></i></button>
                                <button id={input.hasOwnProperty('_id') ? input._id : 'id'+ index} className='delete-button' onClick={this.handleDeleteOption} name={input.saved ? "saved"  + index : index}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
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
            if(!this.state.pollSaved && !this.state.pollDeleted) {
                return (
                    <div className='poll-editor'>
                        <div className="title-input-group">
                            <label htmlFor="title">Title</label>
                            <input 
                                type="text" 
                                value={this.state.title} 
                                name='title' 
                                placeholder='Who do you want to be your captain?'
                                onKeyDown={this.handleReturn} 
                                onChange={this.handleInput} 
                                disabled={this.state.titleSaved ? true : false}
                            />
                            <button className={this.state.titleSaved ? 'hidden' : 'save-button'} onClick={this.handleTitleSave}><i className="fa fa-floppy-o" aria-hidden="true"></i></button>
                            <button className={this.state.titleSaved ? 'hidden' : 'clear-button'} onClick={this.handleClear} name='title'><i className="fa fa-eraser" aria-hidden="true"></i></button>
                            
                        </div>
                        <div className="option-inputs">
                            {this.renderOptions(this.state.options)}
                            <div className="poll-controls">
                                <button className={this.state.options.length === this.state.numSavedOptions ? 'add-button' : 'hidden'} onClick={this.addOptionInput}>New Option <i className="fa fa-plus-square-o" aria-hidden="true"></i></button>
                                <div className="save-delete">
                                    <button className={this.state.numSavedOptions >=2 && this.state.options.length === this.state.numSavedOptions ? 'save-button' : 'hidden'} onClick={this.handleSavePoll}>Save Poll <i className="fa fa-floppy-o" aria-hidden="true"></i></button>
                                    <button className='delete-button' onClick={this.handleDeletePoll}>Delete Poll <i className="fa fa-trash-o" aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            } else if (this.state.pollDeleted) {
                return <Redirect to='/all/my'/>
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
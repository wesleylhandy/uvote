import React, { Component } from 'react';

import { authUser, unAuthUser } from '../utils/helpers';

export default class Authentication extends Component {
    constructor(props){
        super(props);
        this.state = {
            username_field: {
                label: '',
                value: '',
                status: 'valid',
                validation: ''
            },
            password_field: {
                label: '',
                value: '',
                status: 'valid',
                validation: ''
            },
            dots: ''
        }
        this.handleInput = this.handleInput.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    login = (e) => {
        e.preventDefault();
        let isValid = true;
        if(!this.state.username_field.value.trim()) {
            isValid = false;
            this.setState({username_field: {
                label: '*',
                value: '',
                status: 'error',
                validation: 'Please enter your email address.'
            }}); 
        }
        if(!this.state.password_field.value.trim()) {
            isValid = false;
            this.setState({password_field: {
                label: '*',
                value: '',
                status: 'error',
                validation: 'Please enter your password.'
            }}); 
        }
        if(isValid) {
            authUser(this.state.username_field.value, this.state.password_field.value).then(user => {
                console.log(user);
                this.props.updateAuth(true);
                this.setState({
                    username_field: 
                        {label: '', status: 'valid', validation: '', value: ''},
                    password_field: 
                        {label: '', status: 'valid', validation: '', value: ''}
                });
            }).catch(err=> this.setState({username_field: {label: '*', status: 'error', validation: JSON.stringify(err, null, 2), value: ''}, password_field: {label: '*', status: 'error', validation: '', value: ''}}));
        }
    }

    logout = () => {
        unAuthUser().then(()=> this.props.updateAuth(false)).catch(err=> alert(JSON.stringify(err, null, 2)));
    }

    handleInput(e) {
        e.preventDefault();
        if (e.target.name === 'password') {
            
            this.setState({password_field: {value: this.state.password_field.value + e.target.value.slice(-1), label: '', validation: '', status: 'valid'}});
            let dots ='';
            for(let i = 0; i < e.target.value.length; i++) {
                dots += '•'
            }
            this.setState({dots});

        }
        else this.setState({username_field: {value: e.target.value, label: '', validation: '', status: 'valid'}})
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const message = from.pathname === '/' ? `Please Click Here to ${this.props.isAuth ? 'Log out' : 'Log in'}` : `You must log in to view the page at ${from.pathname}`;
        return ( 
            <div>
                <p>{ message }</p>
                <form onSubmit={this.login} className={this.props.isAuth ? 'hidden' : ''}>
                    <div className='form-group'>
                        <div className={this.state.username_field.status !== 'error' ? 'validation hidden' : 'validation'} required>{this.state.username_field.validation}</div>
                        <label className='username-label'>{this.state.username_field.label}</label>
                        <input type='email' name='username' placeholder='you@example.com' value={this.state.username_field.value} onChange={this.handleInput}/>
                    </div>
                    <div className='form-group'>
                        <div className={this.state.password_field.status !== 'error' ? 'validation hidden' : 'validation'} required>{this.state.password_field.validation}</div>
                        <label className='password-label'>{this.state.password_field.label}</label>
                        <input type='text' name='password' placeholder='ex: abc123D$' value={this.state.dots} onChange={this.handleInput}/>
                    </div>
                    <button onClick={ this.login }>Log In</button> 
                </form> 
                <button className={this.props.isAuth ? '' : 'hidden'} onClick={ this.logout }>Log Out</button> 
            </div>
        )
    }
}
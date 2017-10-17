import React, { Component } from 'react';

import { newUser } from '../utils/helpers';

export default class SignUp extends Component {
    constructor(props) {
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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
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

    isValidEmail(username) {
        return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/).test(username);
    }
    isValidPassword(password) {
        return (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/).test(password);
    }

    handleSubmit(e) {
        e.preventDefault();
        let isValid = true;
        if (!this.isValidEmail(this.state.username_field.value)) {
            this.setState({username_field: {
                label: '*',
                value: '',
                status: 'error',
                validation: 'Please enter a valid email address'
            }}) 
            
            isValid = false;
        }
        if (!this.isValidPassword(this.state.password_field.value)) { 
            this.setState({password_field: {
                label: '*',
                value: '',
                status: 'error',
                validation: 'Password must be at least 8 characters in length include at least 1 lowercase letter, 1 capital letter, 1 number and 1 special character (ie. #?!@$%^&*-_).'
            }}) 
            
            isValid = false;
        }
        if(isValid) {
            newUser({username: this.state.username_field.value, password: this.state.password_field.value}).then(user=> {
                console.log(user);
                this.props.updateAuth(true);
            }).catch(err=> {
                switch(err.title) {
                    case 'Insecure Password':
                        this.setState({password_field: {
                            label: '*',
                            value: '',
                            status: 'error',
                            validation: err.title + ': ' + err.message
                        }});
                        break;
                    case 'Duplicate Username':
                    case 'Invalid Username':
                        this.setState({username_field: {
                            label: '*',
                            value: '',
                            status: 'error',
                            validation: err.title + ': ' + err.message
                        }});
                        break;
                    default: 
                        alert(JSON.stringify(err, null, 2));
                        break;
                }
            });
        }
    }

    render() {
        if(this.props.isAuth) return <div>Please Log Out of the current account before creating a new one.</div>
        else return ( 
            <div>
                <p>Please Choose a Username and Password</p> 
                <form onSubmit={this.handleSubmit}>
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
                    <button onClick={ this.handleSubmit }>Sign Up</button> 
                </form>

            </div>
        )
    }
}
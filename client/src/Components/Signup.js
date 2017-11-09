import React, { Component } from 'react';
import Modal from 'react-modal';
import {Redirect} from 'react-router-dom';
import { newUser } from '../utils/helpers';

const customStyles = {
    content : {
      top                   : '33%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -33%)'
    }
};

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username_field: {
                error_label: '',
                value: '',
                status: 'valid',
                validation: ''
            },
            password_field: {
                error_label: '',
                value: '',
                status: 'valid',
                validation: ''
            },
            dots: '',
            modalIsOpen: true,
            isAuth: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal(){
        this.setState({modalIsOpen: false});
    }

    handleDelete(e) {
        if (e.key === "Backspace") {
            e.preventDefault();
            this.setState({ password_field: { value: this.state.password_field.value.slice(0, -1), error_label: '', validation: '', status: 'valid' }, dots: this.state.dots.slice(0, -1) });
        }
    }

    handleInput(e) {
        e.preventDefault();
        if (e.target.name === 'password') {
            
            this.setState({password_field: {value: this.state.password_field.value + e.target.value.slice(-1), error_label: '', validation: '', status: 'valid'}});
            let dots ='';
            for(let i = 0; i < e.target.value.length; i++) {
                dots += '•'
            }
            this.setState({dots});

        }
        else this.setState({username_field: {value: e.target.value, error_label: '', validation: '', status: 'valid'}})
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
                error_label: '*',
                value: '',
                status: 'error',
                validation: 'Please enter a valid email address'
            }}) 
            
            isValid = false;
        }
        if (!this.isValidPassword(this.state.password_field.value)) { 
            this.setState({password_field: {
                error_label: '*',
                value: '',
                status: 'error',
                validation: 'At least 8 digits + 1 from each: [a - z], [A - Z], [0 - 9] & [ #?!@$%^&*-_ ].'
            }}) 
            
            isValid = false;
        }
        if(isValid) {
            newUser({username: this.state.username_field.value, password: this.state.password_field.value}).then(user=> {
                this.setState({isAuth: true});
                this.props.updateAuth(true, user.creatorId);
            }).catch(err=> {
                switch(err.title) {
                    case 'Insecure Password':
                        this.setState({password_field: {
                            error_label: '*',
                            value: '',
                            status: 'error',
                            validation: err.title + ': ' + err.message
                        }});
                        break;
                    case 'Duplicate Username':
                    case 'Invalid Username':
                        this.setState({username_field: {
                            error_label: '*',
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

    componentDidMount() {
        this.setState({isAuth: this.props.isAuth});
    }

    render() {
        const redirect = () => {
            if(this.state.isAuth) {return <Redirect to='/portal'/>}
            else if (!this.state.modalIsOpen) {return <Redirect to='/'/>}
            else return }
        return ( 
            <section className='auth-section'>
                <Modal 
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                >
                    <p>Please Choose a Username and Password</p> 
                    <form onSubmit={this.handleSubmit} className='auth-form'>
                        <div className='form-group'>
                            <div className='required'>{this.state.username_field.error_label}</div>
                            <label htmlFor="username"><i className="fa fa-user-o" aria-hidden="true"></i></label>
                            <div className={this.state.username_field.status !== 'error' ? 'hidden' : 'validation'} required>{this.state.username_field.validation}</div>
                            <input type='email' name='username' placeholder='you@example.com' value={this.state.username_field.value} onChange={this.handleInput}/>
                        </div>
                        <div className='form-group'>
                            <div className='required'>{this.state.password_field.error_label}</div>
                            <label htmlFor="password"><i className="fa fa-key" aria-hidden="true"></i></label>
                            <div className={this.state.password_field.status !== 'error' ? 'hidden' : 'validation'} required>{this.state.password_field.validation}</div>
                            <input type='text' name='password' placeholder='ex: abc123D$' value={this.state.dots} onChange={this.handleInput} onKeyDown={this.handleDelete}/>
                        </div>
                        <button onClick={ this.handleSubmit }>Sign Up</button> 
                    </form>
                </Modal>
                {redirect()}
            </section>
        )
    }
    
}
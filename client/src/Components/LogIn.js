import React, { Component } from 'react';
import Modal from 'react-modal';
import {Redirect} from 'react-router-dom';
import { authUser } from '../utils/helpers';

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

export default class Authentication extends Component {
    constructor(props){
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
            isAuth: null
        }
        this.handleInput = this.handleInput.bind(this);
        this.login = this.login.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal(){
        this.setState({modalIsOpen: false});
    }

    login = (e) => {
        e.preventDefault();
        let isValid = true;
        if(!this.state.username_field.value.trim()) {
            isValid = false;
            this.setState({username_field: {
                error_label: '*',
                value: '',
                status: 'error',
                validation: 'Please enter your email address.'
            }}); 
        }
        if(!this.state.password_field.value.trim()) {
            isValid = false;
            this.setState({password_field: {
                error_label: '*',
                value: '',
                status: 'error',
                validation: 'Please enter your password.'
            }}); 
        }
        if(isValid) {
            authUser(this.state.username_field.value, this.state.password_field.value).then(user => {
                this.props.updateAuth(true, user.creatorId);
                this.setState({
                    username_field: 
                        {error_label: '', status: 'valid', validation: '', value: ''},
                    password_field: 
                        {error_label: '', status: 'valid', validation: '', value: ''},
                    isAuth: true
                });
            }).catch(err=> {this.setState({
                username_field: 
                    {error_label: '*', status: 'error', validation: JSON.stringify(err, null, 2), value: ''}, 
                password_field: 
                    {label: '*', status: 'error', validation: '', value: ''}
                })
            });
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

    componentDidMount() {
        this.setState({isAuth: this.props.isAuth});
    }

    render() {

        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const message = from.pathname === '/' ? `Enter your email address and password` : `You must log in to view the page at ${from.pathname}`;
        const redirect = () => {
            if(this.state.isAuth) {return <Redirect to={this.props.history.location.pathname !== '/login' ? this.props.history.location.pathname : '/portal'}/>}
            else if (!this.state.modalIsOpen) { return <Redirect to={this.props.history.location.pathname !== '/login' ? this.props.history.location.pathname : '/'}/>}
            else return }
        return ( 
            <section className='auth-section'>
                <Modal 
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                >
                    <p>{ message }</p>
                    <form onSubmit={this.login} className={this.props.isAuth ? 'auth-form hidden' : 'auth-form'}>
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
                            <input type='text' name='password' placeholder='ex: abc123D$' value={this.state.dots} onChange={this.handleInput}/>
                        </div>
                        <button onClick={ this.login }>Log In</button> 
                    </form> 
                </Modal>
                {redirect()}
            </section>
        )
    }
}
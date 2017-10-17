import React, { Component } from 'react';
import Modal from 'react-modal';
import {Redirect} from 'react-router-dom';
import { unAuthUser } from '../utils/helpers';

const customStyles = {
    content : {
      top                   : '25%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -25%)'
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
            isAuth: true
        }
        this.logout = this.logout.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal(){
        this.setState({modalIsOpen: false});
    }

    logout = () => {
        unAuthUser().then(()=> {
            this.props.updateAuth(false, null);
            this.setState({
                username_field: 
                    {error_label: '', status: 'valid', validation: '', value: ''},
                password_field: 
                    {error_label: '', status: 'valid', validation: '', value: ''},
                isAuth: false
            });
        }).catch(err=> alert(JSON.stringify(err, null, 2)));
    }

    componentDidMount() {
        this.setState({isAuth: this.props.isAuth});
    }

    render() {
        const redirect = () => {
            if(!this.state.isAuth || !this.state.modalIsOpen) return <Redirect to='/'/>
            else return 
        }
        return ( 
            <section className='auth-section'>
                <Modal 
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                >
                    <p>Please Click Here to Log Out</p>
                    
                    <button onClick={ this.logout }>Log Out</button> 
                 </Modal>
                {redirect()}
            </section>
        )
    }
}
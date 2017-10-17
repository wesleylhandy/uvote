import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

export default class UserPortal extends Component {
    constructor(props) {
        super(props);
        this.state={
            userId: '',
            isAuth: ''
        }
    }
    componentDidMount(){
        this.setState({userId: this.props.userId, isAuth: this.props.isAuth});
    }
    render() {
        if(this.props.userId && this.props.isAuth) {
            return (
                <section>
                    <p>You're creator ID is {this.state.userId}. All of the polls you create will be saved under this id and can be viewd by the public. You will be able to share your polls with your friends once they are created.</p>
                
                </section>
                
            );
        
        
        } else return <Redirect to={{
            pathname: '/login',
            state: { from: {pathname: '/portal' }}
        }}/>
        
    }
}
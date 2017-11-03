import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class PortalMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      isAuth: props.isAuth
    }
  }

  render() {
    if (this.state.isAuth) return <div className='user-id'>You're creator ID is <span className='display-id'>{this.state.userId}</span>. All of the polls you create will be saved under this id and can be viewed by the public. You will be able to share your polls with your friends once they are created.</div>
    else return <Redirect to={{
      pathname: '/login',
      state: { from: { pathname: '/portal' } }
    }} />;
  }
}

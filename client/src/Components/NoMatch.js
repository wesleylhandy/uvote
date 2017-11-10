import React, { Component } from 'react';

export default class NoMatch extends Component{
	constructor(props){
		super(props);
	}
  render() {
    return <div className="no-match">The page you are looking for at {this.props.location.path} does not exist.</div>
  }
}
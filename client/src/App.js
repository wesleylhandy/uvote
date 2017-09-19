import React, { Component } from 'react';

import Header from './Components/Header';
import Body from './Components/Body';
import Footer from './Components/Footer';


export default class App extends Component {
    render() {
        return ( 
            <div>
                <Header / >
                <Body / >
                <Footer / >
            </div>
        )
    }
}
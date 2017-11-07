import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';

const Router = () => <BrowserRouter><App userId='' isAuth='false'/></BrowserRouter>;

ReactDOM.render( <Router /> ,
    document.getElementById('root')
);
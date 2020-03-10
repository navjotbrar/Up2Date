import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table';
import { Container } from "reactstrap";
import {BrowserRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

ReactDOM.render(
    <BrowserRouter>
            <App />
    </BrowserRouter>, document.getElementById('root')
            
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

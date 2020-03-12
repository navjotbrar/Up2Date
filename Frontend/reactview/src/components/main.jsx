import React from 'react';
import Login from './login';
import LandingPage from './landingpage';
import NewPostView from './newpost'
import About from './about'
import { Router, Switch, Route } from 'react-router-dom';

const Main = () => (
    <Switch>
        <Route exact path = "/" component = {LandingPage} />
        <Route exact path = "/newpost" component = {NewPostView} /> 
        <Route exact path = "/login" component = {Login} /> 
        <Route exact path = "/about" component = {About} />
    </Switch>
)

export default Main;

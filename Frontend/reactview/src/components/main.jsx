import React from 'react';
import Login from './login';
import LandingPage from './landingpage';
import { Router, Switch, Route } from 'react-router-dom';
import Signup from './signup';

const Main = () => (
    <Switch>
        <Route exact path = "/" component = {LandingPage} />
        <Route exact path = "/login" component = {Login} />
        <Route exact path = "/signup" component = {Signup} />

    </Switch>
)

export default Main;

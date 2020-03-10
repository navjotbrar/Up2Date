import React from 'react';
import Login from './login';
import LandingPage from './landingpage';
import { Router, Switch, Route } from 'react-router-dom';

const Main = () => (
    <Switch>
        <Route exact path = "/" component = {LandingPage} />
        <Route exact path = "/login" component = {Login} />
    </Switch>
)

export default Main;

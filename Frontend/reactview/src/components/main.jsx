import React from 'react';
import Login from './login';
import LandingPage from './landingpage';
import NewPostView from './newpost'
<<<<<<< HEAD
import About from './about'
=======
import PostList from './postlist'
>>>>>>> master
import { Router, Switch, Route } from 'react-router-dom';
import Signup from './signup';

import HomePage from './homepage';
const Main = () => (
    <Switch>
        <Route exact path = "/" component = {LandingPage} />

        <Route exact path = "/homepage" component = {HomePage} />
        <Route exact path = "/login" component = {Login} />
        <Route exact path = "/signup" component = {Signup} />
        <Route exact path = "/about" component = {About} />
        <Route exact path = "/posts"  render={(props) => <PostList {...props} />} />
        <Route exact path = "/newpost" component = {NewPostView} /> 

    </Switch>
)

export default Main;

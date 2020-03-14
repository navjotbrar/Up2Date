import React from 'react';
import Login from './login';
import LandingPage from './landingpage';
import NewPostView from './newpost'
import PostList from './postlist'
import { Router, Switch, Route } from 'react-router-dom';
import Signup from './signup';

const Main = () => (
    <Switch>
        <Route exact path = "/" component = {LandingPage} />

        <Route exact path = "/login" component = {Login} />
        <Route exact path = "/signup" component = {Signup} />
        <Route exact path = "/posts"  render={(props) => <PostList {...props} />} />
        <Route exact path = "/newpost" component = {NewPostView} /> 

    </Switch>
)

export default Main;

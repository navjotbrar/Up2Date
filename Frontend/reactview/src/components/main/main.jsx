import React from 'react';
import Login from '../login/login';
import LandingPage from '../landingPage/landingpage';
import NewPostView from '../posts/newpost'
import PostList from '../posts/postlist'
import { Router, Switch, Route } from 'react-router-dom';
import Signup from '../signUp/signup';
import HomePage from '../homepage/homepage';
import FullPostView from '../posts/fullPostView';
import SearchView from '../search/searchView';
const Main = () => (
    <Switch>
        <Route exact path = "/" component = {LandingPage} />
        <Route exact path = "/homepage" component = {HomePage} />
        <Route exact path = "/login" component = {Login} />
        <Route exact path = "/signup" component = {Signup} />
        <Route exact path = "/posts"  render={(props) => <PostList {...props} />} />
        <Route exact path = "/newpost" component = {NewPostView} /> 
        <Route exact path = "/searchview" component = {SearchView} /> 
        <Route exact path = "/fullpost" render={(props) => <FullPostView {...props} loggedIn={false} />} /> 

    </Switch>
)

export default Main;

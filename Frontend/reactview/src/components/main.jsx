import React from "react";
import Login from "./login";
import LandingPage from "./landingpage";
import NewPostView from "./newpost";
import PostList from "./postlist";
import { Router, Switch, Route } from "react-router-dom";
import Signup from "./signup";
import HomePage from "./homepage";
import FullPostView from "./fullPostView";
import About from './about'



const Main = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/homepage" component={HomePage} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/posts" render={props => <PostList {...props} />} />
    <Route exact path="/newpost" component={NewPostView} />
    <Route exact path="/about" component={About} />
    <Route
      exact
      path="/fullpost"
      render={props => <FullPostView {...props} loggedIn={false} />}
    />
  </Switch>
);

export default Main;

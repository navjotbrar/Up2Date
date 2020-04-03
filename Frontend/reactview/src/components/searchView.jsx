import React from "react";
import { Jumbotron, Container, Row, Col, Image, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import styled from 'styled-components';
import Posts from "./posts.jsx";
import { withRouter } from "react-router-dom";
import { resolve } from "url";
import { logOut} from '../actions';
import {connect} from 'react-redux';
import reader from "./img/reader.png";
import view from "./img/view.png";
import remove from "./img/remove.png";
import write from "./img/notepad.png";
import { fetchPosts } from "../actions";
import SearchPostList from './searchPostList';

const BoxDiv = styled.div`
    justify-content: center;
    align-content: center;
    margin-left: 50px;
    margin-right: 50px;
`;

const MyDiv = styled.div`
   padding: 30px;
`;

const ButtonDiv = styled.div`
    width: 500px;
`;

const ProfileDiv = styled.div`
    padding: 30px;
    // width: 300px;
    // height: 250px;
    background: rgba(255, 255, 255, .5);
    margin-bottom: 50px;
`;

const MySec = styled.section` 
    // width: 300px;
    // height: 250px;  
    background: rgba(211,211,211);
    margin-bottom: 30px;
    margin-top: 30px;
    // margin-left: 50px;
`;

class SearchView extends React.Component{
    

    constructor(props) {
        super(props);
        this.state = {
          posts: []
        };
    }

    componentDidMount(){
      
    }

    render(){

        return(
            <MyDiv key = {this.props.search}>
                <SearchPostList search = {this.props.search} title = "Search Results"/>
            </MyDiv>
        )
    }
}

const mapStateToProps = (state) => {
    if(Object.keys(state.userInfo).length === 0 && state.userInfo.constructor === Object){
        if(state.persistedState == null){
            return {
                search: state.searchInfo.search,
                username: null
            };
        }
        state.userInfo = state.persistedState.userInfo;
    }
    
    if(state.userInfo.username == null){
    return {
            search: state.searchInfo.search,
            username: null
        };
    }

    return {
        search: state.searchInfo.search,
        username: state.userInfo.username,
        firstName: state.userInfo.firstName,
        loggedIn: 'true',
        feed: state.posts.postList
    };
}

export default connect(mapStateToProps, {logOut: logOut})(withRouter(SearchView));
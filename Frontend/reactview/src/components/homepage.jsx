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
import PostList from './postlist';

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

class HomePage extends React.Component{
    

    handleOnClick = (event) => {
        window.scrollBy(0, 500);
    }
    goToNewPostView = () => {
        this.props.history.push('./newpost')
    }

    constructor(props) {
        super(props);
        this.state = {
          posts: []
        };
      }
 

    render(){
        return(
            <MyDiv>
            <Container>  
                <Jumbotron>
                <Image src={reader} width="100" height="100" />
                                        {this.props.loggedIn == 'true'
                                            ?   <h1>Hello {this.props.firstName}  </h1>
                                            :   <></>
                                        }
                </Jumbotron>
            </Container>
            
                <Container>
                    <Row>
                        <Col xs>
                        
                                <ProfileDiv>
                                    <Image src={view} width="100" height="100" />
                                    <Button variant="light" onClick = {this.handleOnClick}><h2>View my posts</h2></Button>
                                    </ProfileDiv>  
                        
                        </Col>
                        <Col xs>
                       
                                <ProfileDiv>
                                    <Image src={write} width="100" height="100" />
                                    <Button variant="light" onClick = {this.goToNewPostView}><h2>Add new posts</h2></Button>
                                    </ProfileDiv>  
                        
                        </Col>
                        <Col xs>
                         
                                <ProfileDiv>
                                    <Image src={remove} width="100" height="100" />
                                    <Button variant="light"><h2>Delete account</h2></Button>
                                    </ProfileDiv>  
                           
                        </Col>
                    </Row>
                </Container>
                
            {/* <BoxDiv>    
                    {this.state.posts}
            </BoxDiv> */}

            <PostList amount = '10' author = {this.props.username} title = "My Posts"/>
            
            </MyDiv>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    if(Object.keys(state.userInfo).length === 0 && state.userInfo.constructor === Object){
        console.log("in nulll");
        if(state.persistedState == null){
            return {
                username: null
            };
        }
        state.userInfo = state.persistedState.userInfo;
    }
    
    console.log("nope")
    if(state.userInfo.username === null){
        window.location.href = './login';
        return {
            username: null
        };
    }

    console.log(state.userInfo.username)
    
    return {
        username: state.userInfo.username,
        firstName: state.userInfo.firstName,
        loggedIn: 'true',
        feed: state.posts.postList
    };
}

export default connect(mapStateToProps, {logOut: logOut})(withRouter(HomePage));
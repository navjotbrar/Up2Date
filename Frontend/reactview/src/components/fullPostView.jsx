import * as React from 'react';
import { Form, Button, Media, Image, Modal } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router-dom";
import styled from 'styled-components';
import {connect} from 'react-redux';
import {fetchLogin, logOut} from '../actions';
import { ReactTinyLink } from 'react-tiny-link'
import "./landingpage.css";
import reply from "./img/reply-solid.svg"; 
import replyWhite from "./img/reply-white.svg"; 

const Title = styled.h1`
    font-size: 28px;
    font-weight: bold;
    color: #333333;
    float: center;
    display:flex;
    justify-content: left;
    align-content: left;
    margin-bottom: 15px;
    // padding: 10px;
`
const GridContainer = styled.div`
    column-gap: 30px;
    width: 90%;
    height: 90%;
    display: grid;
    grid-template-columns: 3fr 2fr;
    margin: 50px;
`
const FirstCol = styled.div`
    float: left;
    background-color: rgb(230, 230, 230);
    padding: 25px;
    margin: 20px;
    border-radius: 10px;
    overflow-y:auto;
    overflow-x:hidden;
`
const SecondCol = styled.div`
    padding: 25px;
    margin: 20px;
    float: right;
    border: 5px solid #cacaca;
    border-radius: 10px;
    overflow-y:auto;
    overflow-x:hidden;
    position: relative;
`
//props.id: post id
class FullPostView extends React.Component {

    state = {
        comments: [],
        fullCommentList: [],
        loaded: false,
        postinfo: {},
        commentCount: '',
        newComment: '',
        selected: {},
        modalVisibility: false,
        newComment: '',
        newReply: ''
    }
    milToStandard = (value) => {
        if (value !== null && value !== undefined){ //If value is passed in
          if(value.indexOf('AM') > -1 || value.indexOf('PM') > -1){ //If time is already in standard time then don't format.
            return value;
          }
          else {
            if(value.length == 8){ //If value is the expected length for military time then process to standard time.
              var hour = value.substring ( 0,2 ); //Extract hour
              var minutes = value.substring ( 3,5 ); //Extract minutes
              var identifier = 'AM'; //Initialize AM PM identifier
       
              if(hour == 12){ //If hour is 12 then should set AM PM identifier to PM
                identifier = 'PM';
              }
              if(hour == 0){ //If hour is 0 then set to 12 for standard time 12 AM
                hour=12;
              }
              if(hour > 12){ //If hour is greater than 12 then convert to standard 12 hour format and set the AM PM identifier to PM
                hour = hour - 12;
                identifier='PM';
              }
              return hour + ':' + minutes + ' ' + identifier; //Return the constructed standard time
            }
            else { //If value is not the expected length than just return the value as is
              return value;
            }
          }
        }
    };
    getDate = (dateString) => {
        if(typeof dateString == 'undefined') return "";

        dateString = dateString.substring(0, dateString.length - 5) + '-0600';

        const date = new Date(dateString);

        const day = date.toString().substring(0, 10);

        let hour = date.getHours().toString(); 
        hour.length == 1 ? hour = '0' + hour : hour = hour;
        
        let minute = date.getMinutes().toString(); 
        minute.length == 1 ? minute = '0' + minute : minute = minute;
        
        let second = date.getSeconds().toString(); 
        second.length == 1 ? second = '0' + second : second = second;

        const militaryTime = hour + ':' + minute + ':' + second;

        const regTime = this.milToStandard(militaryTime);
        return day + ', ' +regTime;
    } 
    async componentDidMount(){

        let postinfo = {};
        if(typeof this.props.location.state == 'undefined'){
            const localStore = JSON.parse(window.localStorage.getItem('post'));
            console.log(localStore);
            console.log("in undefined");
            if(localStore == null){
                this.props.history.push('/');
                return null;
            }
            postinfo = localStore;
        } else {
            postinfo = this.props.location.state.postinfo;
            window.localStorage.setItem('post', JSON.stringify(this.props.location.state.postinfo));
        }
        console.log(postinfo);
        console.log(" in here !! ");


        try {

            let r = await fetch('http://localhost:8080/comment/post/' + postinfo.postid);

            console.log(r.status);
            if(r.status == 403){
                alert("Comments are currently unavailable");
                return;
            }

            let result = await r.json();

            console.log(result);

            this.setState({fullCommentList: result, postinfo: postinfo, commentCount: result.length});

            this.showComments(result);

        } catch (error) {
            console.log("error in FUllPostView Componentdid mount: ");
            console.log(error);
        }
    }
    commentClick = (e) => {
        console.log("clicked, id: " + e.commentId);
        if(this.props.username == null){
            alert("Please login to comment");
            return;
        }
        this.setState({
            modalVisibility: true,
            selected: e
        });
    }
    nestClick = () => {
        alert("clicked1");
    }
    showComments = (input) => {
        let comments = input;
        if(this.state.commentCount == '0') {
            this.setState({loaded: true});
            return null;
        }
        let commentArr = [];

        comments.forEach(comment => {
            if(comment.parentCommentId == 0){
                let nestedComments = [];
                
                comments.forEach(c => {
                    if(c.parentCommentId == comment.commentId){
                        nestedComments.push(c);
                        c.parentCommentId = -2;
                    }
                })

                const tempComment = <Media style ={{ borderLeft: "2px solid lightgray", margin: "3px", padding: "3px"}}>
                                        <Media.Body id = {comment.commentId}  style = {{marginLeft: "10px"}}>
                                            <p> {comment.content} </p>
                                            <small style = {{fontStyle: "italic"}}>-{comment.author} | </small> 
                                            <small>{this.getDate(comment.createdDate)}</small>
                                            <Image src = {reply} width = "20px"  style = {{position: "relative", left: "10px"}} onClick = {() => this.commentClick(comment)}/>
                                            {this.makeNestedComment(nestedComments)}
                                        </Media.Body>
                                    </Media>
                ;

                commentArr.push(tempComment);
            }
        })
        
        this.setState({
            comments: commentArr,
            loaded: true
        })
    }
    makeNestedComment = (nesteds) => {
        let comments = this.state.fullCommentList;
        let result = [];

        nesteds.forEach(nested => {

            let nestedComments = [];
                
            comments.forEach(c => {
                if(c.parentCommentId == nested.commentId){
                    nestedComments.push(c);
                    c.parentCommentId = -2;
                }
            })

            const tempComment = <Media style ={{ borderLeft: "2px solid lightgray", margin: "3px", padding: "3px"}}>
                                    <Media.Body id = {nested.commentId} style = {{marginLeft: "10px"}}>
                                        <p>{nested.content}</p>
                                        <small style = {{fontStyle: "italic"}}>-{nested.author} | </small>
                                        <small>{this.getDate(nested.createdDate)}</small>
                                        <Image src = {reply} width = "20px" style = {{position: "relative", left: "10px"}} onClick = {() => this.commentClick(nested)}/>
                                        {this.makeNestedComment(nestedComments)}
                                    </Media.Body>
                                </Media>
            ;
            result.push(tempComment);
        })
        return result;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("pressed submit");
    }

    action = async () => {
        console.log("action pressed");
        console.log(this.props.username);
        console.log(this.state.newComment);

        if(this.props.username == null){
            alert("Please login to post a comment");
            return;
        }

        if(this.state.newComment.length < 1){
            alert("Please write a comment");
            return;
        }

        await this.postComment(0, this.state.newComment);
    }
    replyAction = async () => {
        console.log("replyAction pressed");
        console.log(this.props.username);
        console.log(this.state.newComment);

        if(this.props.username == null){
            alert("Please login to post a comment");
            return;
        }

        if(this.state.newReply.length < 1){
            alert("Please write a reply");
            return;
        }

        await this.postComment(this.state.selected.commentId, this.state.newReply);

        this.setState({modalVisibility: false});
        this.forceUpdate();
    }
    postComment = async (parentId, content) => {

        const date = new Date(Date.now()); 
        //"yyyy-MM-dd'T'HH:mm:ss.SSSZ"

        let month = (date.getMonth() + 1).toString(); 
        month.length == 1 ? month = '0' + month : month = month; 
        // console.log('month: ' + month);
        let day = date.getDate().toString(); 
        day.length == 1 ? day = '0' + day : day = day;
        
        let hour = date.getHours().toString(); 
        hour.length == 1 ? hour = '0' + hour : hour = hour;
        
        let minute = date.getMinutes().toString(); 
        minute.length == 1 ? minute = '0' + minute : minute = minute;
        
        let second = date.getSeconds().toString(); 
        second.length == 1 ? second = '0' + second : second = second;
        

        const dateString = date.getFullYear() + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second;
        console.log(dateString);
        
        const response = await fetch('http://localhost:8080/comment/post/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({author: this.props.username, parentCommentId: +parentId, content: content, postId: this.state.postinfo.postid, createdDate: dateString, lastModifiedByDate: dateString})
        });

        console.log("response: ");
        // const t = await response.text();
        console.log(response.status);

        if(response.status != 200){
            alert("Unable to post comment, server down");
            return;
        }
        this.componentDidMount();
    }

    handleChange = (e) => {
        this.setState({
            newComment: e.target.value
        })
    }
    handleChangeReply = (e) => {
        this.setState({
            newReply: e.target.value
        })
    }
    closeModal = () => {
        this.state.modalVisibility = false;
        this.forceUpdate();
    }

    render(){
        if(this.state.loaded)
            return(
                <>
                <GridContainer>
                    <FirstCol>
                        <Title> {this.state.postinfo.title} </Title>
                        <div style = {{justifyContent: "left", paddingBottom: "15px"}}>
                            <ReactTinyLink
                                cardSize = "large"
                                showGraphic = {true}
                                maxLine = {3}
                                minLine = {1}
                                url = {this.state.postinfo.link}
                            />
                        </div>

                        <div style = {{textAlign: "left", fontSize: "16px"}}> 
                            {this.state.postinfo.body} 
                        </div>
                    </FirstCol>

                    <SecondCol>
                        <Title style = {{borderBottom: "3px solid black"}}>  
                            {this.state.commentCount} Comments 
                        </Title>

                        <div style = {{textAlign: "left", fontSize: "16px", overflowY: "auto", maxHeight: "30rem"}}>
                            {this.state.comments}
                        </div>

                        <div style = {{position: "absolute", bottom: "0", width: "90%"}}>
                            <Form onSubmit = {this.handleSubmit}>
                                <Form.Group controlId="formGroupEmail" style = {{display: "grid"}}>
                                    <Form.Control type="username" placeholder="Add a comment..." id = "newComment" onChange = {this.handleChange} style = {{gridRow: "2"}}/>
                                    <Button variant="primary" onClick = {this.action} style = {{gridRow: "2"}}>Post</Button>
                                </Form.Group>
                            </Form>
                        </div>
                    </SecondCol>

                </GridContainer>

                <Modal show = {this.state.modalVisibility} onHide = {this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title> Replying to {this.state.selected.author}'s comment </Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body style = {{marginBottom: "20px"}}>
                        <Media style ={{ borderLeft: "2px solid lightgray", margin: "3px", padding: "3px"}}>
                            <Media.Body id = {this.state.selected.commentId}  style = {{marginLeft: "10px"}}>
                                <p> {this.state.selected.content} </p>
                                <small style = {{fontStyle: "italic"}}>-{this.state.selected.author} | </small> 
                                <small>{this.getDate(this.state.selected.createdDate)}</small>
                            </Media.Body>
                        </Media>
                    </Modal.Body>

                    <Modal.Body>
                        <div style = {{position: "absolute", bottom: "0", width: "90%"}}>
                            <Form onSubmit = {this.handleSubmit}>
                                <Form.Group controlId="formGroupEmail" style = {{display: "grid"}}>
                                    <Form.Control type="username" placeholder="Reply to comment..." id = "replyComment" onChange = {this.handleChangeReply} style = {{gridRow: "2"}}/>
                                    <Button variant="primary" onClick = {this.replyAction} style = {{gridRow: "2"}}> 
                                        <Image src = {replyWhite} width = "20px" style = {{marginBottom: "3px"}}></Image>
                                    </Button>
                                </Form.Group>
                            </Form>
                        </div>
                    </Modal.Body>
			    </Modal>
                </>
            );
        else
            return null;
    }

}

const mapStateToProps = (state) => {
    if(Object.keys(state.userInfo).length === 0 && state.userInfo.constructor === Object){
        console.log("in nulll");
        if(state.persistedState == null){
            return {
                username: null
            };
        }
        state.userInfo = state.persistedState.userInfo;
    }
    if(state.userInfo.username === null){
        return {
            username: null
        };
    }
    console.log(state.userInfo.username)

    return {
        username: state.userInfo.username,
        firstName: state.userInfo.firstName,
        loggedIn: 'true'
    };
}

export default connect(mapStateToProps, {fetchLogin: fetchLogin, logOut: logOut})(withRouter(FullPostView));

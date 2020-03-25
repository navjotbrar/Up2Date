import * as React from 'react';
import { Form, Button, Media } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router-dom";
import styled from 'styled-components';
import {connect} from 'react-redux';
import {fetchLogin, logOut} from '../actions';
import { ReactTinyLink } from 'react-tiny-link'

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
        newComment: ''
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

        const postinfo = this.props.location.state.postinfo;
        console.log(postinfo);
        console.log(" in here !! ");

        try {

            let r = await fetch('http://localhost:8080/comment/post/' + postinfo.postid);
            let result = await r.json();

            console.log(result);

            this.setState({fullCommentList: result, postinfo: postinfo, commentCount: result.length});

            this.showComments(result);

        } catch (error) {
            console.log("error in FUllPostView Componentdid mount: ");
            console.log(error);
        }
    }

    showComments = (input) => {
        let comments = input;
        if(this.state.commentCount == 0) return;
        let commentArr = [];

        comments.forEach(comment => {
            if(comment.parentCommentId == -1){
                let nestedComments = [];
                
                comments.forEach(c => {
                    if(c.parentCommentId == comment.commentId){
                        nestedComments.push(c);
                        c.parentCommentId = -2;
                    }
                })

                console.log("yuh in comments");
                console.log(nestedComments);

                const tempComment = <Media style ={{ border: "2px solid lightgray", margin: "3px", borderRadius: "5px", padding: "3px"}}>
                                        <Media.Body>
                                            <p>{comment.content}</p>
                                            <small>{this.getDate(comment.createdDate)}</small>
                                            {this.makeNestedComment(nestedComments)}
                                        </Media.Body>
                                    </Media>
                ;

                commentArr.push(tempComment);
            }
        })

        for(let i = 0; i < 100; i++){
            commentArr.push(<div> {i}</div>);
        }
        
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

            const tempComment = <Media style ={{ border: "2px solid lightgray", margin: "3px", borderRadius: "5px", padding: "3px"}}>
                                    <Media.Body>
                                        <p>{nested.content}</p>
                                        <small>{this.getDate(nested.createdDate)}</small>
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

    action = () => {
        console.log("action pressed");
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: [e.target.value]
        })
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
                </>
            );
        else
            return null;
    }

}

const mapStateToProps = (state) => {

}

export default connect(mapStateToProps, {fetchLogin: fetchLogin, logOut: logOut})(withRouter(FullPostView));

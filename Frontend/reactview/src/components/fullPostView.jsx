import * as React from 'react';
import { Form, Button } from 'react-bootstrap';
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
const ButtonDiv = styled.div`     
    display:flex;
    justify-content: center;
    align-content: center;
    padding-top: 10px;
    // padding-bottom: 20px;
`
//props.id: post id
class FullPostView extends React.Component {

    state = {
        comments: [],
        loaded: false,
        postinfo: {},
        commentCount: '',
        newComment: ''
    }

    async componentDidMount(){

        const postinfo = this.props.location.state.postinfo;
        console.log(postinfo);
        console.log(" in here !! ");

        try {

            let r = await fetch('http://localhost:8080/comment/post/' + postinfo.postid);
            let result = await r.json();

            console.log(result);

            this.setState({postinfo: postinfo, commentCount: result.length});

            this.showComments(result);

        } catch (error) {
            console.log("error in FUllPostView Componentdid mount: ");
            console.log(error);
        }
    }

    showComments = (comments) => {
        if(this.state.commentCount == 0) return;
        let commentArr = [];

        comments.forEach(comment => {
            const tempComment = <div> {comment.content} </div>;
            commentArr.push(tempComment);
        })

        for(let i = 0; i < 100; i++){
            commentArr.push(<div> {i}</div>);
        }
        
        this.setState({
            comments: commentArr,
            loaded: true
        })
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

                        <div style = {{textAlign: "left", fontSize: "16px", overflowY: "auto", maxHeight: "20rem"}}>
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

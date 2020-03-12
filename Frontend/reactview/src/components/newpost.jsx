import React from "react";
import { Jumbotron, Container, Row, Col, Image, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import styled from 'styled-components';
import { withRouter } from "react-router-dom";
import { resolve } from "url";
import {connect} from 'react-redux';
import {newPost, logOut} from '../actions';

const FormDiv = styled.div`
	display: flex;
	justify-content: center;
	padding: 20px;
	text-align: left;
`
const SignUpJumbo = styled(Jumbotron)`
	padding: 1rem 2rem;
	// background-color: red;
	width: 80%;
	max-width: 800px;
`

class NewPost extends React.Component {

	state = {
		title: '',
		link: '',
		body: ''
	}

	action = async () => {
        
		if(this.state.title[0].length < 1 || this.state.body[0].length < 1 || this.state.link[0].length < 1){
			alert("Please enter valid content");
			return;
		}

		if(this.props.username == null){
			alert("Please login to post");
			this.props.history.push('./login');
		}

		this.props.newPost(this.state.title[0], this.state.link[0], this.state.body[0], this.props.username);
	}

	handleChange = (e) => {
		this.setState({
			[e.target.id]: [e.target.value]
		})
	} 
	
	render() {
		return (
			<FormDiv>
				<Container style = {{display: "flex", justifyContent: "center"}}>
				 <SignUpJumbo> 

					 <h1>Enter New Post Details</h1>

					<Form>
						<Form.Group controlId="exampleForm.ControlInput1">
							<Form.Label>Title</Form.Label>
							<Form.Control type="text" placeholder="Enter a meaningful title" id = "title" onChange = {this.handleChange}/>
						</Form.Group>
						<Form.Group controlId="exampleForm.ControlInput2">
							<Form.Label>Link</Form.Label>
							<Form.Control type="text" placeholder="Link (Required)" id = "link" onChange = {this.handleChange}/>
						</Form.Group>
						<Form.Group controlId="exampleForm.ControlTextarea1">
							<Form.Label>Description</Form.Label>
							<Form.Control as="textarea" rows="4" id = "body" onChange = {this.handleChange}/>
						</Form.Group>
					</Form>
						
					<div className="btnDiv">
						<Button variant="primary" onClick = {this.action}>
							Post
						</Button>
					</div>

					</SignUpJumbo>
				</Container>
			</FormDiv>
		);
	}
}

const mapStateToProps = (state) => {
	// console.log(state.posts.postList);
	// console.log("in newpost");
	if(Object.keys(state.userInfo).length === 0 && state.userInfo.constructor === Object){
        console.log("in null 2");
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
	return {
        username: state.userInfo.username
    };
}

export default connect(mapStateToProps, {newPost: newPost, logOut: logOut})(withRouter(NewPost));

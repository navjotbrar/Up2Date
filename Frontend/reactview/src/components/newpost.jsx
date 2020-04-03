import React from "react";
import { Jumbotron, Container, Row, Col, Image, Button, Form, Modal } from "react-bootstrap";
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
const ButtonDiv = styled.div`
	// padding: 1rem 2rem;
	// background-color: red;
	// width: 80%;
	// max-width: 800px;

`

class NewPost extends React.Component {

	state = {
		title: '',
		link: '',
		body: '',
		modalVisibility: false,
		preview: {
			articleTitle: '',
			articleDesc: '',
			imageUrl: ''
		}
	}
	errorCheck = () => {
		if(this.state.title == '' || this.state.body == '' || this.state.link == ''){
			alert("Please enter something");
			return false;
		}
		
		if(this.state.title[0].length < 1 || this.state.body[0].length < 1 || this.state.link[0].length < 1){
			alert("Please enter valid content");
			return false;
		}

		if(this.state.body[0].length > 1995){
			alert("Your post is too long, maximum 2000 characters allowed");
			return false;
		}

		if(this.props.username == null){
			alert("Please login to post");
			this.props.history.push('./login');
			return false;
		}
		return true;
	}
	action = async () => {
		if(!this.errorCheck()){		//if false then error
			return;
		}
		
		const result = await this.props.newPost(this.state.title[0], this.state.link[0], this.state.body[0], this.props.username);
		
		if(!result){
			alert("Something went wrong, please try again");
		} else {
			alert("Your Post: " + this.state.title[0] + " Has Been Posted!");
			this.props.history.push('./homepage');
		}
	}
	preview = async () => {
		if(!this.errorCheck()){		//if false then error
			return;
		}
		const response = await fetch('http://localhost:8080/post/getJustPreview/',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({link: this.state.link[0]})
		});	
		
		let result = await response.json();
		
		console.log("result is: \n");
		console.log(result.articledesc);
		console.log(result.articletitle);
		console.log(result.imageurl);

		if(result.articledesc == 'Could not decode website'){
			result.articledesc = 'No description available';
			result.articletitle = '';
		}

		this.setState({
			preview: {
				articleTitle: result.articletitle,
				articleDesc: result.articledesc,
				imageUrl: result.imageurl
			},
			modalVisibility: true
		});

		console.log("at end of preview");

	}
	closeModal = () => {
        this.state.modalVisibility = false;
        this.forceUpdate();
    }
	handleChange = (e) => {
		this.setState({
			[e.target.id]: [e.target.value]
		})
	} 
	
	render() {
		return (
			<>
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
								<Form.Control as="textarea" placeholder = "Provide a description" rows="4" id = "body" onChange = {this.handleChange}/>
							</Form.Group>
						</Form>
							
						<ButtonDiv>
							<Button variant="primary" onClick = {this.action}>
								Post
							</Button>
							<> </>
							<Button variant="dark" onClick = {this.preview}>
								Preview
							</Button>
						</ButtonDiv>

					</SignUpJumbo>
				</Container>
			</FormDiv>

			<Modal show = {this.state.modalVisibility} onHide = {this.closeModal}>
				<Modal.Header closeButton>
					<Modal.Title>{this.state.title[0]}</Modal.Title>
				</Modal.Header>
				
				<Modal.Header>
					<Modal.Title>{this.state.preview.articleDesc}</Modal.Title>
				</Modal.Header>
				
				<Modal.Body>
					<Image style = {{maxHeight: "150px"}} src = {this.state.preview.imageUrl} rounded/> 
				</Modal.Body>

				<Modal.Body>{this.state.preview.articleTitle}</Modal.Body>
				
				<hr></hr>

				<Modal.Body> {this.props.username} : "{this.state.body[0]}" </Modal.Body>

			</Modal>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	console.log(state.posts.postList);          // TODO: delete these 2 lines
	console.log("in newpost");                  //
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

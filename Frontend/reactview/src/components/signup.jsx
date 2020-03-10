import React from "react";
import { Jumbotron, Container, Row, Col, Image, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import styled from 'styled-components';
import "./signup"
import { withRouter } from "react-router-dom";
import { resolve } from "url";

const FormDiv = styled.div`
	display: flex;
	justify-content: center;
	padding: 20px;
`

const SignUpJumbo = styled(Jumbotron)`
	padding: 1rem 2rem;
`

class SignUp extends React.Component {

	state = {
		first_name: '',
		last_name: '',
		password: '',
		username:'',
		email: '',
	}
	
	render() {
		return (
			<FormDiv>
				<Container>
				 <SignUpJumbo> 
					 <h1>Enter Details</h1>
						<Form.Row>
							<Form.Group as = {Col} md = "4" >
								<Form.Label>First name</Form.Label>
								<Form.Control type="name" placeholder="First Name" id ="first_name" onChange = {this.handleChange} />
							</Form.Group>

							<Form.Group as = {Col} md = "4">
								<Form.Label>Last name</Form.Label>
								<Form.Control type="name" placeholder="Last Name" id ="last_name" onChange = {this.handleChange} />
							</Form.Group>

					</Form.Row>

					<Form.Row>
							<Form.Group as = {Col} md ="4"  id ="usernameOuter">
								<Form.Label>Username</Form.Label>
								<Form.Control  placeholder="Username" id ="username" onChange = {this.handleChange} />
								<Form.Control.Feedback type="invalid"> Please choose a username. </Form.Control.Feedback>
							</Form.Group>

                            <Form.Group as = {Col} md ="4"  id ="email">
								<Form.Label>Email</Form.Label>
								<Form.Control  placeholder="Email" id ="email" onChange = {this.handleChange} />
								<Form.Control.Feedback type="invalid"> Please enter an email</Form.Control.Feedback>
							</Form.Group>

							<Form.Group as = {Col} md ="4"  id ="password">
								<Form.Label>Password</Form.Label>
								<Form.Control type="password" placeholder="Password" id ="password" onChange = {this.handleChange} />
							</Form.Group>
					</Form.Row>
						<div className="btnDiv">
							<Button variant="primary" onClick = {this.action}>
								Submit
							</Button>
						</div>
					</SignUpJumbo>
				</Container>
			</FormDiv>
		);
	}
}
// @ts-ignore
export default withRouter(SignUp);
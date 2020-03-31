import React from "react";
import { Jumbotron, Container, Row, Col, Image, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import styled from "styled-components";
import "./signup";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addnewuser } from "../actions";

import UserInfo from './UserInfo'
import LoginInfo from './LoginInfo'

const FormDiv = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const SignUpJumbo = styled(Jumbotron)`
  padding: 1rem 2rem;
`;

class SignUp extends React.Component {
  // dropListener = (e) => {
  //     this.setState({
  //         type: [e.target.value]
  //     })
  // }

  action = async () => {
    if (
      this.state.first_name == "" ||
      this.state.last_name == "" ||
      this.state.pasword == "" ||
      this.state.username == "" ||
      this.state.email == ""
    ) {
      console.log(JSON.stringify(this.state.username));
      console.log("invalid names");
      return;
    }

    const result = await this.props.addnewuser(this.state);
    if (result) {
		console.log("redirecting")
      this.props.history.push("./login");
    }
    // this.props.addUser(this.state.username,this.state.password,this.state.first_name,this.state.last_name,this.state.email);
    // const userExists = await this.checkIfUserExists();
    // 	//console.log(userExists + " hiii ");
    // 	if(userExists == "taken"){
    // 		alert("that username is taken");
    // 		return;
    // 	}
  };

  handleChange = e => {
	console.log("called")
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };

  state = {
    step: 1,
    first_name: "",
    last_name: "",
    password: "",
    username: "",
    email: ""
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

	handleChange = input => e =>{
		this.setState({[input]:e.target.value})
	}	


  render() {
	  const {step} = this.state
		const {first_name,last_name,email,password,username} = this.state
		const values = {first_name,last_name,email,password,username}
		switch (step) {
			case 1:
				return(
					<UserInfo
					nextStep ={this.nextStep}
					handleChange={this.handleChange}
					values={values}
					/>
				)
			case 2: 
				return(
					<LoginInfo
					prevStep ={this.prevStep}
					submit={this.action}
					handleChange={this.handleChange}
					values={values}
					/>
				)
		}
  }
}

export default connect(null, { addnewuser: addnewuser })(withRouter(SignUp));
    //   <FormDiv>
    //     <Form onSubmit={this.handleSubmit}>
    //       <Container>
    //         <SignUpJumbo>
    //           <h1>Enter Details</h1>
    //           <Form.Row>
    //             <Form.Group as={Col} md="4">
    //               <Form.Label>First name</Form.Label>
    //               <Form.Control
    //                 type="name"
    //                 placeholder="First Name"
    //                 id="first_name"
    //                 onChange={this.handleChange}
    //               />
    //             </Form.Group>

    //             <Form.Group as={Col} md="4">
    //               <Form.Label>Last name</Form.Label>
    //               <Form.Control
    //                 type="name"
    //                 placeholder="Last Name"
    //                 id="last_name"
    //                 onChange={this.handleChange}
    //               />
    //             </Form.Group>
    //           </Form.Row>

    //           <Form.Row>
    //             <Form.Group as={Col} md="4" id="usernameOuter">
    //               <Form.Label>Username</Form.Label>
    //               <Form.Control
    //                 placeholder="Username"
    //                 id="username"
    //                 onChange={this.handleChange}
    //               />
    //               <Form.Control.Feedback type="invalid">
    //                 {" "}
    //                 Please choose a username.{" "}
    //               </Form.Control.Feedback>
    //             </Form.Group>

    //             <Form.Group as={Col} md="4" id="email">
    //               <Form.Label>Email</Form.Label>
    //               <Form.Control
    //                 placeholder="Email"
    //                 id="email"
    //                 onChange={this.handleChange}
    //               />
    //               <Form.Control.Feedback type="invalid">
    //                 {" "}
    //                 Please enter an email
    //               </Form.Control.Feedback>
    //             </Form.Group>

    //             <Form.Group as={Col} md="4" id="password">
    //               <Form.Label>Password</Form.Label>
    //               <Form.Control
    //                 type="password"
    //                 placeholder="Password"
    //                 id="password"
    //                 onChange={this.handleChange}
    //               />
    //             </Form.Group>
    //           </Form.Row>

    //           <div className="btnDiv">
    //             <Button variant="primary" onClick={this.action}>
    //               Submit
    //             </Button>
    //           </div>
    //         </SignUpJumbo>
    //       </Container>
    //     </Form>
    //   </FormDiv>
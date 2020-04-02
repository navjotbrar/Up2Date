import React from "react";
import { Jumbotron, Container, Row, Col, Image, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import styled from "styled-components";
import "./signup";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addnewuser } from "../actions";

import UserInfo from "./UserInfo";
import LoginInfo from "./LoginInfo";

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
      alert("invalid or empty fields... please try again")
      return;
    }

    const result = await this.props.addnewuser(this.state);
    if (result) {
      console.log("redirecting");
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
    console.log("called");
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
    console.log(this.state.step)
    if ((this.state.first_name == "" ||this.state.last_name == "" ||this.state.email == "") && this.state.step == 1) {
      alert("all field must be filled!");
      return;
    } else if ((this.state.username == "" || this.state.password == "") && this.state.step == 2) {
      alert("all field must be filled");
      return
    } else {
      const { step } = this.state;
      this.setState({
        step: step + 1
      });
    }
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const { first_name, last_name, email, password, username } = this.state;
    const values = { first_name, last_name, email, password, username };
    switch (step) {
      case 1:
        return (

        <div className = "row">
          <div className = "left">

          </div>
          <div className = "right">
          <div className = "title">
            <h1> Create an account</h1>
          </div>
            <UserInfo 
              nextStep={this.nextStep}
              handleChange={this.handleChange}
              values={values}
            />
          </div>
        </div>
        );
      case 2:
        return (
                  <div className = "row">
          <div className = "left">

          </div>
          <div className = "right">
          <div className = "title">
            <h1> Create an account</h1>
          </div>
          <LoginInfo
            prevStep={this.prevStep}
            submit={this.action}
            handleChange={this.handleChange}
            values={values}
          />
          </div>
        </div>
        );
    }
  }
}

export default connect(null, { addnewuser: addnewuser })(withRouter(SignUp));

import * as React from 'react';
import {Form, Button, DropdownButton, Dropdown} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import {fetchLogin, fetchPosts} from '../actions';
import HomePage from './homepage';

const ButtonDiv = styled.div`     
    display:flex;
    justify-content: center;
    align-content: center;
    padding-top: 10px;
    padding-bottom: 20px;
`
const FormDiv = styled.div`     
    margin: auto;
    width: 300px;
    background-color: rgb(230, 230, 230);
    display:flex;
    border-radius: .2rem;
    align-content: center;
    justify-content: center;
    padding-top: 40px;
`

class Login extends React.Component{

    state = {
        username: '',
        password: '',
    }

    dropListener = (e) => {
        this.setState({
            type: [e.target.value]
        })
    }

    action = () => {
        if(this.state.username === '' || this.state.password === ''){
            alert("Please enter valid credentials");
            return;
        } 
        else{
            console.log(this.state.type + " 909090");
            this.verify();
            
        }
        window.location = HomePage;
        this.props.fetchPosts();
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: [e.target.value]
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }
    async verify() {
        try {
            this.props.fetchLogin(this.state.username,this.state.password);
            this.props.history.push(HomePage);
            console.log(" yuhh ");
        } catch (error) {
            console.log(error);
        }
    }
    
    render(){
        return(
            <div style = {{paddingTop: '10px', marginTop: '40px'}}>
                <FormDiv>
                    <Form onSubmit = {this.handleSubmit}>
                    <p style = {{color: '#23272b', fontWeight: 'bold', fontSize: '20'}}>
                        Enter Account details
                    </p>
                    
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="Enter username" id = "username" onChange = {this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" id = "password" onChange = {this.handleChange}/>
                    </Form.Group>

                    <ButtonDiv>
                        <Button variant="primary" onClick = {this.action} >Sign in</Button>
                    </ButtonDiv>

                    </Form>
                </FormDiv>
                
            </div>
        )
    }
}

export default connect(null, {fetchLogin: fetchLogin, fetchPosts: fetchPosts})(withRouter(Login,HomePage));

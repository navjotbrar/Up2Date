import * as React from 'react';
import {Form} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { withRouter } from "react-router-dom";

import {connect} from 'react-redux';

const FormDiv = styled.div`     
    margin: auto;
    width: 800px;
    background-color: rgb(230, 230, 230);
    display:flex;
    border-radius: .2rem;
    align-content: center;
    justify-content: center;
    padding-top: 40px;
`

class About extends React.Component{   
    
    render(){
        return(
            <div style = {{paddingTop: '10px', marginTop: '40px'}}>
                <FormDiv>
                    <Form onSubmit = {this.handleSubmit}>
                    <p style = {{color: '#22250b', fontWeight: 'bold', fontSize: 28, textAlign: 'left', text: '10px', paddingLeft: '10px', paddingBottom: '60px'}}>
                        Our mission is to reinvent how people share, discover, and interact.
                    </p>
                    
                    <Form.Group controlId="formGroupBody">
                        <Form.Label>
                            <p style = {{color: '#23272b', fontWeight: 'normal', fontSize: 16, textAlign: 'left', paddingLeft: '10px'}}>
                                No matter where you are in the world we want to connect your ideas with other people. 
                                Up2date is designed to facilitate and grow communities without the restrictions 
                                found on other platforms. 
                                <br />
                                <br />                                
                                Founded in January 2020 and based in Calgary, Alberta, 
                                up2date is a social media platform 
                                developed and produced by an independent group of creative individuals.
                            </p></Form.Label>
                    </Form.Group>
                    </Form>
                </FormDiv>
                
            </div>
        )
    }
}

export default (withRouter(About));

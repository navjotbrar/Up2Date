import * as React from 'react';
import {Form, Button, DropdownButton, Dropdown} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { withRouter } from "react-router-dom";

import {connect} from 'react-redux';

const FormDiv = styled.div`     
    margin: auto;
    width: 600px;
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
                    <p style = {{color: '#23272b', fontWeight: 'bold', fontSize: 20, textAlign: 'left', text: '10px', paddingLeft: '10px'}}>
                        About Us
                    </p>
                    
                    <Form.Group controlId="formGroupBody">
                        <Form.Label>
                            <p style = {{color: '#23272b', fontWeight: 'normal', fontSize: 16, textAlign: 'left', paddingLeft: '10px'}}>
                        up2date is developed and produced by an independent group of creative individuals.
                    </p></Form.Label>
                    </Form.Group>
                    </Form>
                </FormDiv>
                
            </div>
        )
    }
}

export default (withRouter(About));

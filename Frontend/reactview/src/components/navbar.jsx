import * as React from 'react';
import {Card, Navbar, Button, Nav, Jumbotron} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const MyLink = styled(Link)`     
    text-decoration: none;
    color: rgba(255,255,255,.5);
    &:hover {
        color: rgba(255,255,255,.75);
        text-decoration: none;
    }
    
`
const SignUp = styled(Link)`     
    text-decoration: none;
    color: #333;
    &:hover {
        color: white;
        background-color: black;
        text-decoration: none;
    }
    background-color: #e9ecef;
    padding: 7px 10px;
    border-radius: 3px;
    font-size: 12;
    float:right;
}
`
class CustomNavbar extends React.Component{

    render(){

        return(
            <>
             <Navbar bg="dark" variant="dark" fixed = "top">
                <Navbar.Brand href="/">
                   Up2Date®
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link>
                        <MyLink to="./about">About us</MyLink>
                    </Nav.Link>
                    <Nav.Link>
                        <MyLink to="./login">Sign in</MyLink>
                    </Nav.Link>
                </Nav>
                <Nav.Link>
                    <SignUp to="./signup">Sign Up</SignUp>
                </Nav.Link>
            </Navbar>
        </>
        );
    }
}

export default CustomNavbar;
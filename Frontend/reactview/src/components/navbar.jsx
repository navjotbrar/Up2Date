import * as React from 'react';
import {Card, Navbar, Button, Nav, Jumbotron} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const MyLink = styled(Link)`     
    text-decoration: none;
    color: rgba(255,255,255, 0.5);
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
    padding: 3px 10px;
    border-radius: 3px;
    font-size: 12;
    float:right;
}
`

const CustomNav = styled(Navbar)`
    background-color: rgb(97, 97, 97);
`
class CustomNavbar extends React.Component{

    render(){

        return(
            <>
             <CustomNav bg = "dark"  variant="dark" fixed = "top">
                <Navbar.Brand href="/">
                   
                
                   up2date®
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
            </CustomNav>
        </>
        );
    }
}

export default CustomNavbar;
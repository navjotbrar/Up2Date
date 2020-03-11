import * as React from 'react';
import {Card, Navbar, Button, Nav, Jumbotron} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {fetchLogin, logOut} from '../actions';

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

    // state = {
    //     loggedIn: ''
    // }
    
    componentDidMount = () =>{
        // this.props.username = "yuh";
    };

    action = () => {
        this.props.logOut();
    }

    navButton = () => {
        if(this.props.loggedIn == 'false'){
            return (
                <>
                    <Nav.Link>
                        <SignUp to="./signup">Sign Up</SignUp>
                    </Nav.Link>
                </>
            )
        } else {
            return (
                <div> 
                    <Button variant="primary" style = {{padding: "3px 10px", margin: "7px"}} onClick = {this.action}> press to logout Mr.{this.props.username} </Button>
                </div>
            )
        }
    }

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
                        <MyLink to="./login">{this.props.username}</MyLink>
                    </Nav.Link>
                </Nav>
                {/* <Nav.Link>
                    <SignUp to="./signup">Sign Up</SignUp>
                </Nav.Link> */}

                
                    {this.navButton()}
                
            </CustomNav>
        </>
        );
    }
}

const mapStateToProps = (state) =>{
    console.log("state in navbar:")
    console.log(state)
    if(Object.keys(state.userInfo).length === 0 && state.userInfo.constructor === Object){
        console.log("in nulll");
        state.userInfo = state.persistedState.userInfo;
    }
    console.log("nope")
    if(state.userInfo.username === null){
        return {
            username: null
        };
    }
    console.log(state.userInfo.username)

    return {
        username: state.userInfo.username,
        loggedIn: 'true'
    };
}

export default connect(mapStateToProps, {fetchLogin: fetchLogin, logOut: logOut})(CustomNavbar);
// export default CustomNavbar;
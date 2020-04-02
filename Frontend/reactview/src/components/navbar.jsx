import * as React from 'react';
import {Card, Navbar, Button, Nav, Dropdown, ButtonGroup, Form, FormLabel,FormControl } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router-dom";
import styled from 'styled-components';
import {connect} from 'react-redux';
import {fetchLogin, logOut, updateSearch} from '../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch } from '@fortawesome/free-solid-svg-icons'

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
const GreetingDiv = styled.div`     
    display:flex;
    justify-content: center;
    align-content: center;
    color: white;
`

const CustomNav = styled(Navbar)`
    background-color: rgb(97, 97, 97);
`

const Searchbar = styled.div`
    align-content: center;
    width: 1000px;
`
const Searchform = styled(Form)`
    align-content: center;
    width: 40%;
    position: fixed;
    left: 27%;

`
const MyIcon = styled.div`
    align-content: center;
    position: fixed;
    left: 67%;
    margin-left: 5px;
`
class CustomNavbar extends React.Component{
    state = {
        search:''
    }
    logOutAction = () => {
        this.props.logOut();
        this.props.history.push('./');
    }

    goToNewPostView = () => {
        this.props.history.push('./newpost')
    }

    handleOnClick = async () => {
        console.log(this.state.search);
        const result = await this.props.updateSearch(this.state);
        this.props.history.push('./searchview');
    }
    handleOnSubmit = () => {
        console.log(this.state.search + "90909090");
        this.handleOnClick();
    }

    handleChange = (e) => {
		this.setState({
			[e.target.id]: [e.target.value][0]
        })
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
                    <Dropdown as={ButtonGroup} style = {{padding: "0px 10px", margin: "4px"}}>
                    <Button variant="success" onClick = {this.goToNewPostView}>+ New Post</Button>

                    <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                    <Dropdown.Menu>
                        <Dropdown.Item href="./homepage">Go to Homepage</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick = {this.logOutAction}>Log Out</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                </div>
            )
        }
    }

    render(){

        return(
            <>
             <CustomNav bg = "dark"  variant="dark" fixed = "top">
                <Navbar.Brand href="/" style = {{paddingTop: "0.6125rem"}}>
                   up2date®
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link>
                        <MyLink to="./about">About us</MyLink>
                    </Nav.Link>
                    <Nav.Link>
                        {this.props.loggedIn == 'false'
                            ?   <MyLink to="./login">Login</MyLink>
                            :   <></>
                        }
                    </Nav.Link>
                </Nav>
               
                    <Searchform onSubmit = {this.handleOnSubmit}>
                        
                            <FormControl className="ml-10 mr-3 w-400" type="text" placeholder="Search" id = "search" onChange = {this.handleChange} />

                    </Searchform> 
                    <MyIcon>
                        <Button variant = "secondary" onClick = {this.handleOnClick}>
                        <FontAwesomeIcon icon={faSearch} size="lg" color ="white" mr-3  /> 
                        </Button >
                        
                    </MyIcon>
                    
                    
            
                
                {this.props.loggedIn == 'true'
                    ?   <Nav.Link>
                            <MyLink to="./homepage" style = {{color: "white"}}> Hello {this.props.firstName} </MyLink>
                        </Nav.Link> 
                    :   <></>
                }
            
                {this.navButton()}
                
            </CustomNav>
        </>
        );
    }
}

const mapStateToProps = (state) => {

    if(Object.keys(state.userInfo).length === 0 && state.userInfo.constructor === Object){
        console.log("in nulll");
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
    console.log(state.userInfo.username)

    return {
        username: state.userInfo.username,
        firstName: state.userInfo.firstName,
        loggedIn: 'true'
    };
}

export default connect(mapStateToProps, {fetchLogin: fetchLogin, logOut: logOut, updateSearch: updateSearch})(withRouter(CustomNavbar));
// export default CustomNavbar;
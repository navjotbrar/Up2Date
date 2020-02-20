import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Form, Button, FormControl,} from "react-bootstrap";


export default class CustomNavbar extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="./">Up2Date</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav></Nav>
        </Nav>
          <Button class="p-2" href="./Signup">Sign Up</Button>
      </Navbar>
    )
  }
}
import * as React from 'react';
import {Card, Navbar, Button, Nav, Jumbotron,Form, FormControl} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import styled from 'styled-components';


class CustomNavbar extends React.Component{

    render(){

        return(
            <>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">Up2Date</Navbar.Brand>
                    <Nav className="mr-auto">
                    <Nav.Link href="#pricing">example1</Nav.Link>
                    </Nav>
                    <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                    </Form>
                </Navbar>
             </>
        );
    }
}

export default CustomNavbar;
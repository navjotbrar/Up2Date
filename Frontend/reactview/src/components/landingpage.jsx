import * as React from 'react';
import { Jumbotron, Container, Row, Col, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import CustomNavbar from './navbar'; 

const BoxDiv = styled.div`     
    display:flex;
    justify-content: center;
    align-content: center;
    padding: 100px;
`

class LandingPage extends React.Component{
    render() {
        return( 
            <div  className="LandingPage">
               <BoxDiv>
                <Container>
                    <Jumbotron>
                        <h1>up2date</h1>
                        <p>
                           the only way to stay up to date
                        </p>
                        <Link to="./signup">
                            <Button className = "btn" bsStyle="primary">Sign Up</Button>
                        </Link>
                    </Jumbotron>
                </Container>
                </BoxDiv>
           
            </div>     
        )
    }
}

export default LandingPage;
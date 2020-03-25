import * as React from 'react';
import {Card, Navbar, Button, Nav, Dropdown, Jumbotron} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router-dom";
import styled from 'styled-components';
import {connect} from 'react-redux';
import {fetchLogin, logOut} from '../actions';

const Title = styled.h1`
    font-size: 28px;
    color: #333333;
    float: center;
    display:flex;
    justify-content: center;
    align-content: center;
    margin-bottom: -10px;
    background-color: #f2f2f2;
    border-radius: 10px;
    border-color: #8c8c8c;
    padding: 10px;
`
const GridContainer = styled.div`
    column-gap: 30px;
    width: 117%;
    height: 90%;
    display: grid;
    grid-template-columns: 2fr 3fr;
    margin-top: 50px;
`
const FirstCol = styled.div`
    // width: 60%;
    padding: 0 20px 0 0;
    float: left;
    background-color: rgb(230, 230, 230);
    padding-top: 10px;
    margin-top: 20px;
    border-radius: 10px;
    overflow-y:auto;
    overflow-x:hidden;
`
const SecondCol = styled.div`
    // width: 40%;
    padding-top: 10px;
    margin-top: 20px;
    float: right;
    border: 5px solid #cacaca;
    border-radius: 10px;
    overflow-y:auto;
    overflow-x:hidden;
`
//props.id: post id
class FullPostView extends React.Component {

    state = {
        comments: [],
        loaded: false,
        postinfo: {}
    }

    async componentDidMount(){

        const postinfo = this.props.location.state.postinfo;
        console.log(postinfo);
        console.log(" in here !! ");

        try {

            let r = await fetch('http://localhost:8080/comment/post/' + postinfo.postid);
            let result = await r.json();

            console.log(result);

            this.setState({comments: result, loaded: true, postinfo: postinfo});

        } catch (error) {
            console.log("error in FUllPostView Componentdid mount: ");
            console.log(error);
        }
    }

    render(){
        if(this.state.loaded)
            return(
                <>
                <GridContainer>
                    <FirstCol>
                        <Title> {this.state.postinfo.title} </Title>
                        <Jumbotron>
                        
                            <img src={this.state.postinfo.imageurl} />
                            <div> {this.state.postinfo.articleTitle}. </div>
                            <div> Description: {this.state.postinfo.desc} </div>

                        </Jumbotron>

                        <h2> {this.state.postinfo.body} </h2>
                    </FirstCol>

                    <SecondCol>
                        <h1> {this.state.comments[1].content} </h1>

                    </SecondCol>

                </GridContainer>
                </>
            )
        else
            return null;
    }

}

const mapStateToProps = (state) => {

}

export default connect(mapStateToProps, {fetchLogin: fetchLogin, logOut: logOut})(withRouter(FullPostView));

import * as React from "react";
import { Jumbotron, Container, Row, Col, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CustomNavbar from "./navbar";
import reader from "./img/reader.png";
import {Table} from "reactstrap"
import Posts from "./posts.jsx";

import globe from "./img/world.png";
import news from "./img/news.png";
import mySvg from "./img/newspaper.png";

const BoxDiv = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 100px;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;
const ImgDiv = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 300px;
  height: 300px;
`;

class LandingPage extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

   getNews(){
       console.log("getting news")
       let  feed = []
       const currentPost = <Posts/>

       feed.push(currentPost)
       feed.push(currentPost)
       feed.push(currentPost)
       feed.push(currentPost)
       
        this.setState({posts:feed})
   } 


  componentDidMount() {
      this.getNews();
  }

  render() {
    return (
      <div className="LandingPage">
        <BoxDiv>
          <Container>
            <Jumbotron>
              <p>
                <Image src={mySvg} width="100" height="100" />
                <Image src={reader} width="100" height="100" />
                <Image src={globe} width="100" height="100" />
                <Image src={news} width="100" height="100" />
              </p>

              <h1>up2date</h1>
              <p>The only way to stay up to date</p>
              <ButtonDiv>
                <Link to="./signup">
                  <Button className="btn" bsStyle="primary" variant="dark">
                    Sign Up
                  </Button>
                </Link>
              </ButtonDiv>
            </Jumbotron>
          </Container>
        </BoxDiv>

        <h1>Trending News</h1>
        {this.state.posts}
      </div>
    );
  }
}

export default LandingPage;

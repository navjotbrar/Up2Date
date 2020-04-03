import * as React from "react";
import { Jumbotron, Container, Row, Col, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import reader from "./img/reader.png";
import PostList from './postlist';
import "./landingpage.css";
import globe from "./img/world.png";
import news from "./img/news.png";
import mySvg from "./img/newspaper.png";
import { fetchPosts } from "../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

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
  padding: 5px;
`;

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  render() {
    return (
      <div className="LandingPage">
        <BoxDiv>
          <Container>
            <Jumbotron style = {{marginBottom: "-110px", marginTop: "-32px"}}>
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
                  <Button className="btn" bsStyle="primary" variant="dark" style = {{margin: "5px"}}>
                    Sign Up
                  </Button>
                </Link>
                <Link to="./posts">
                  <Button className="btn" bsStyle="primary" style = {{margin: "5px"}}>
                    View Posts
                  </Button>
                </Link>
              </ButtonDiv>
            </Jumbotron>
          </Container>
        </BoxDiv>
        <PostList amount = '5' title = "Most Recent Posts"/>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    feed: state.posts.postList
  };
};
export default connect(mapStateToProps, { fetchPosts: fetchPosts })(
  withRouter(LandingPage)
);

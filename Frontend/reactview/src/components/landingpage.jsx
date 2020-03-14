import * as React from "react";
import { Jumbotron, Container, Row, Col, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CustomNavbar from "./navbar";
import reader from "./img/reader.png";
import { Table } from "reactstrap";
import Posts from "./posts.jsx";
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

  oldFunction() {
    console.log("getting news");
    let feed = [];
    const currentPost = <Posts />;

    feed.push(currentPost);
    feed.push(currentPost);
    feed.push(currentPost);
    feed.push(currentPost);

    this.setState({ posts: feed });
  }

  getNews(input) {
    const articles = input;
    let articleRows = [];

    articles.forEach(article => {
      const currentArticle = <Posts info={article} />;
      articleRows.push(currentArticle);
    });
    this.setState({ posts: articleRows });
  }

  componentDidMount() {
this.props.fetchPosts();

  }

  test = () => {
    this.getNews(this.props.feed);
  };

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

              <h1 onClick={this.test}>up2date</h1>
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
        {this.state.posts}
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

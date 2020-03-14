import React, { Component, Fragment } from "react";
import Expand from "react-expand-animated";
import globe from "./img/world.png";
import Login from "./login.jsx";
import ExpandView from "./expandView.jsx"
import { Table } from "reactstrap";
import "bulma/css/bulma.css";
import "./posts.css";

class Posts extends Component {
  state = { open: false };

  toggle = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };

  render() {
    const styles = {
      open: { background: "#ecf0f1" }
    };
    const transitions = ["height", "opacity", "background"];

    return (
      <div onClick={this.toggle}  class = "outside-container">
        <div class="box">
          <article class="media">
            <div className = "picture-div">
              <div class="media-left">
                <img className="pic" src={this.props.info.imageurl} />
              </div>
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{this.props.info.title}</strong> <small>{this.props.info.createDate}</small>
                  <br />
                  {this.props.info.body}
                </p>
                <div className="author">
                  <p>- {this.props.info.author}</p>
                </div>
              </div>
            </div>
          </article>
        </div>
        <Expand open={this.state.open} duration={400} styles={styles}>
          <ExpandView info = {this.props.info}/>
        </Expand>
      </div>
    );
  }
}

export default Posts;

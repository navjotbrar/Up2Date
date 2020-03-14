import React, { Component, Fragment } from "react";
import { Container, Row, Col } from "reactstrap";
import "./expandView.css";

class ExpandView extends Component {
  render() {
    return (
      <div className="articlePreview">
        <img class="expandPic" src={this.props.info.imageurl} /> <br />
        <p>{this.props.info.desc}</p>
      </div>
    );
  }
}

export default ExpandView;

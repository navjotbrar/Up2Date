import React, { Component, Fragment } from "react";
import "./expandView.css";

class ExpandView extends Component {
  render() {
    return (
      <div className="articlePreview">
        <h3>{this.props.info.articleTitle} </h3> <br/>
        <img class="expandPic" src={this.props.info.imageurl} /> <br />
        <p>{this.props.info.desc}</p>
      </div>
    );
  }
}

export default ExpandView;

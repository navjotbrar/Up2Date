import React, { Component, Fragment } from "react";
import "./expandView.css";
import { withRouter } from "react-router-dom";

class ExpandView extends Component {

  goToPost = () => {
    this.props.history.push('/fullpost', { postinfo: this.props.info });
  }

  render() {
    return (
      <div className="articlePreview" onClick = {this.goToPost}>
        <h3 >{this.props.info.desc}  </h3> <br/>
        <img class="expandPic" src={this.props.info.imageurl} /> <br />
        <p>{this.props.info.articleTitle}</p>
      </div>
    );
  }
}

export default withRouter(ExpandView);

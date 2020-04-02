import React, { Component, Fragment } from "react";
import { Button, Alert } from 'react-bootstrap';
import Expand from "react-expand-animated";
import globe from "./img/world.png";
import Login from "./login.jsx";
import ExpandView from "./expandView.jsx"
import { Table } from "reactstrap";
import "bulma/css/bulma.css";
import "./posts.css";

class Posts extends Component {
  state = { 
    open: false,
    alertMessage: false 
  };

  toggle = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };
  goToPost = () => {
    console.log("hi")
  }
  milToStandard = (value) => {
    if (value !== null && value !== undefined){ //If value is passed in
      if(value.indexOf('AM') > -1 || value.indexOf('PM') > -1){ //If time is already in standard time then don't format.
        return value;
      }
      else {
        if(value.length == 8){ //If value is the expected length for military time then process to standard time.
          var hour = value.substring ( 0,2 ); //Extract hour
          var minutes = value.substring ( 3,5 ); //Extract minutes
          var identifier = 'AM'; //Initialize AM PM identifier
   
          if(hour == 12){ //If hour is 12 then should set AM PM identifier to PM
            identifier = 'PM';
          }
          if(hour == 0){ //If hour is 0 then set to 12 for standard time 12 AM
            hour=12;
          }
          if(hour > 12){ //If hour is greater than 12 then convert to standard 12 hour format and set the AM PM identifier to PM
            hour = hour - 12;
            identifier='PM';
          }
          return hour + ':' + minutes + ' ' + identifier; //Return the constructed standard time
        }
        else { //If value is not the expected length than just return the value as is
          return value;
        }
      }
    }
  };
  getDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.toString().substring(0, 10);

    let hour = date.getHours().toString(); 
    hour.length == 1 ? hour = '0' + hour : hour = hour;
    
    let minute = date.getMinutes().toString(); 
    minute.length == 1 ? minute = '0' + minute : minute = minute;
    
    let second = date.getSeconds().toString(); 
    second.length == 1 ? second = '0' + second : second = second;

    const militaryTime = hour + ':' + minute + ':' + second;

    const regTime = this.milToStandard(militaryTime);
    return day + ', ' +regTime;
  } 

  deletePost = async (postid) => {
    console.log("in delete post: " + postid);

    const response = await fetch('http://localhost:8080/post/' + postid,{
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      },
    });

    console.log("response: ");
    // const t = await response.text();
    console.log(response.status);

    if(response.status != 200){
        alert("Unable to delete comment, server down");
        return;
    }

    window.location.reload();
  }
  deletePostClick = async (postid) => {
    console.log("deleting this one: " + postid);
    this.setState({alertMessage: true});
  }

  render() {
    const styles = {
      open: { background: "#ecf0f1" }
    };
    const transitions = ["height", "opacity", "background"];

    return (
      <div class = "outside-container">
        <Alert show={this.state.alertMessage} variant = "danger" style = {{marginTop: "30px"}}>
          <Alert.Heading>Are you sure you want to delete this Post?</Alert.Heading>
          <hr />
          <div className="d-flex justify-content-end">
          <Button onClick={() => this.setState({alertMessage: false})} variant="outline-danger">
              No
          </Button>
          <Button onClick={() => this.deletePost(this.props.info.postid)} variant="outline-success" style = {{marginLeft: "10px"}}>
              Yes
          </Button>
          </div>
        </Alert>
        <div class="box" onClick={this.toggle}>
          <article class="media">
            <div className = "picture-div">
              <div class="media-left">
                <img className="pic" src={this.props.info.imageurl} />
              </div>
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{this.props.info.title}</strong> <small>{this.getDate(this.props.info.createDate)}</small>
                  <br />
                  {this.props.info.body}
                </p>

                <div className="author">
                  
                  { this.props.deletable == 'true'
                    ? <Button variant = "outline-danger" onClick = {() => this.deletePostClick(this.props.info.postid)} style = {{position: "relative", left: "30px", fontSize: "0.8rem"}}> Delete </Button>
                    : <div>- {this.props.info.author} </div>
                  }

                </div>


              </div>
            </div>
          </article>
        </div>
        <Expand open={this.state.open} duration={400} styles={styles} >
          <ExpandView info = {this.props.info} id = {this.props.info.postid}/>   
        </Expand>
      </div>
    );
  }
}

export default Posts;

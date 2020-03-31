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

  render() {
    const styles = {
      open: { background: "#ecf0f1" }
    };
    const transitions = ["height", "opacity", "background"];

    return (
      <div class = "outside-container">
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
                  <p>- {this.props.info.author}</p>
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

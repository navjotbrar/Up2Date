import React, { Component } from 'react';
import './about.css'

class About extends Component {
  render() {
    return (
    <div class="box">
      <div className="break" />
      <div className="lower">
        <div className="crop">
          <img
            className="image"
            src="https://i0.wp.com/digital-photography-school.com/wp-content/uploads/2016/02/Headshot-Photography-London-0997.jpg?resize=750%2C500&ssl=1"
          />
        </div>
        <div className="aboutMe">
          <h2 class="aboutMeHeader">Qasim Muhhummad</h2>
          <br />
          <p className="aboutText">
            Hello, my name is Qasim project manager of Up2Date. I came up with this project when i was working at tesla and realized the same reoccuring problems.
            I always found great news articles on the internet but had no efficient way to share my views with my friends and family. This is why i created Up2Date
            so people can share news articles with their loved onnes and keep everyone up2date on current day news. 
          </p>
        </div>
      </div>
    </div>
    );
  }
}
export default About;
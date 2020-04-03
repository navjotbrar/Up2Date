import React from 'react';
import logo from './logo.svg';
import CustomNavbar from './components/navbar/navbar'; 
import Main from './components/main/main';
import './App.css';
import LandingPage from './components/landingPage/landingpage';

function App() {
  return (
    <div className="App">
      <p>
        <CustomNavbar loggedIn = {'false'}/>
      </p>

      <p>spacer</p>
      
      <Main />

    </div>
  );
}

export default App;

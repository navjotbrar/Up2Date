import React from 'react';
import logo from './logo.svg';
import CustomNavbar from './components/navbar'; 
import Main from './components/main';
import './App.css';
import LandingPage from './components/landingpage';

function App() {
  return (
    <div className="App">
      <p>
        <CustomNavbar />
      </p>

      <p>spacer</p>
      
      <Main />

    </div>
  );
}

export default App;

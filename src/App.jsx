import React from "react";
import videoBg from "./assets/Girl_In_Cafe_Bg.mp4";
import "./App.css";

import MusicControls from "./components/musicControls/MusicControls";
import Clock from "./components/clock/Clock";
import logo from "./assets/logo.png";

function App() {
  return (
    <div className="App">
      <video className="background-video" autoPlay loop muted playsInline>
        <source src={videoBg} type="video/mp4" width={"100%"} height={"100%"} />
      </video>
      <nav>
        <div className="melofi__logo">
          <img src={logo} />
        </div>
        <div className="melofi__rightSide">
          <MusicControls />
          <Clock />
        </div>
      </nav>
    </div>
  );
}

export default App;

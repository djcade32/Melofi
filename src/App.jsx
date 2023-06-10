import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import videoBg from "./assets/Girl_In_Cafe_Bg.mp4";
import "./App.css";

import MusicControls from "./components/musicControls/MusicControls";
import Clock from "./components/clock/Clock";
import logo from "./assets/logo.png";
import Mixer from "./components/mixer/Mixer";

function App() {
  return (
    <div className="App">
      <video className="melofi__background-video" autoPlay loop muted playsInline>
        <source src={videoBg} type="video/mp4" />
      </video>

      <nav>
        <div className="melofi__logo">
          <img src={logo} alt="melofi logo" />
        </div>
        <div className="melofi__rightSide">
          <Mixer />
          <MusicControls />
          <Clock />
        </div>
      </nav>
    </div>
  );
}

export default App;

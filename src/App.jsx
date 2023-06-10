import React from "react";
import videoBg from "./assets/Girl_In_Cafe_Bg.mp4";
import "./App.css";

import MusicControls from "./components/musicControls/MusicControls";
import Clock from "./components/clock/Clock";
import logo from "./assets/logo.png";
import Mixer from "./components/mixer/Mixer";
import AppContextProvider from "./context/AppContext";
import GenreDropdown from "./components/genreDropdown/GenreDropdown";
import NowPlaying from "./components/nowPlaying/NowPlaying";

function App() {
  return (
    <AppContextProvider>
      <div className="App">
        <video className="melofi__background-video" autoPlay loop muted playsInline>
          <source src={videoBg} type="video/mp4" />
        </video>

        <nav>
          <div className="melofi__logo">
            <img src={logo} alt="melofi logo" />
          </div>

          <div className="melofi__rightSide">
            <GenreDropdown />
            <Mixer />
            <MusicControls />
            <Clock />
          </div>
        </nav>

        <div className="melofi__body">
          <NowPlaying />
        </div>
      </div>
    </AppContextProvider>
  );
}

export default App;

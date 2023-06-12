import React from "react";
import "./App.css";

import MusicControls from "./components/musicControls/MusicControls";
import Clock from "./components/clock/Clock";
import logo from "./assets/logo.png";
import Mixer from "./components/mixer/Mixer";
import AppContextProvider from "./context/AppContext";
// import GenreDropdown from "./components/genreDropdown/GenreDropdown";
import NowPlaying from "./components/nowPlaying/NowPlaying";
import Scene from "./components/scene/Scene";
import SceneBg from "./components/sceneBg/SceneBg";

function App() {
  return (
    <AppContextProvider>
      <div className="App" id="app">
        <SceneBg />

        <nav id="nav">
          <div className="melofi__logo">
            <img src={logo} alt="melofi logo" />
          </div>

          <div className="melofi__rightSide">
            {/* GenreDropdown will be a future update */}
            {/* <GenreDropdown /> */}
            <Scene />
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

import React, { useState } from "react";
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
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { RiFullscreenFill, RiFullscreenExitLine } from "./imports/icons";
import Tooltip from "./components/tooltip/Tooltip";

function App() {
  const [showScene, setShowScene] = useState(false);
  const handle = useFullScreenHandle();

  const handleFullscreen = () => {
    if (handle.active) {
      handle.exit();
    } else {
      handle.enter();
    }
  };
  return (
    <AppContextProvider>
      <FullScreen handle={handle}>
        <div className="App" id="app">
          <SceneBg />

          <nav id="nav">
            <div className="melofi__logo">
              <img src={logo} alt="melofi logo" />
            </div>

            <div className="melofi__rightSide">
              {/* GenreDropdown will be a future feature */}
              {/* <GenreDropdown /> */}
              {/* <button
                onClick={() => {
                  if (handle.active) {
                    handle.exit();
                  } else {
                    handle.enter();
                  }
                }}
              >
                Enter fullscreen
              </button> */}

              <Scene showScene={showScene} setShowScene={setShowScene} />
              <Mixer />
              <MusicControls />
              <Tooltip text={handle.active ? "Exit fullscreen" : "Enter fullscreen"}>
                <div
                  className="melofi__fullscreen-button"
                  onClick={handleFullscreen}
                  style={handle.active ? { outline: "1px solid rgba(254, 165, 57, 0.88)" } : {}}
                >
                  {handle.active ? (
                    <RiFullscreenExitLine size={20} color="white" />
                  ) : (
                    <RiFullscreenFill size={20} color="white" />
                  )}
                </div>
              </Tooltip>
              <Clock />
            </div>
          </nav>

          <div>
            <NowPlaying />
          </div>
        </div>
      </FullScreen>
    </AppContextProvider>
  );
}

export default App;

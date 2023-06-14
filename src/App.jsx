import React, { useState, useEffect } from "react";
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
import { RiFullscreenFill, RiFullscreenExitLine, GiTacos } from "./imports/icons";
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

  // Use this when you are ready to redirect away from mobile devices
  // const [screenSize, setScreenSize] = useState(getCurrentDimension());

  // function getCurrentDimension() {
  //   console.log("width: ", window.innerWidth);
  //   console.log("height: ", window.innerHeight);
  //   return {
  //     width: window.innerWidth,
  //     height: window.innerHeight,
  //   };
  // }

  // useEffect(() => {
  //   const updateDimension = () => {
  //     setScreenSize(getCurrentDimension());
  //   };
  //   window.addEventListener("resize", updateDimension);

  //   return () => {
  //     window.removeEventListener("resize", updateDimension);
  //   };
  // }, [screenSize]);
  return (
    <AppContextProvider>
      <FullScreen handle={handle}>
        <div className="App" id="app">
          <SceneBg />

          <nav id="nav" className="melofi__nav">
            <div className="melofi__logo">
              <img src={logo} alt="melofi logo" />
            </div>

            <div className="melofi__rightSide">
              {/* GenreDropdown will be a future feature */}
              {/* <GenreDropdown /> */}
              <Mixer />
              <MusicControls />
              <Scene showScene={showScene} setShowScene={setShowScene} />
              <Tooltip text={handle.active ? "Exit full screen" : "Enter full screen"}>
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

          <NowPlaying />
          <div className="melofi__buyMeATacoLink">
            <div>
              <GiTacos size={30} color="var(--color-secondary-white)" />
              <a href="https://bmc.link/normancade" target="_blank">
                Buy me a taco
              </a>
            </div>
          </div>
        </div>
      </FullScreen>
    </AppContextProvider>
  );
}

export default App;

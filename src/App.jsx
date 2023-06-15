import React, { useState, useEffect } from "react";
import "./App.css";

import MusicControls from "./components/musicControls/MusicControls";
import Clock from "./components/clock/Clock";
import logo from "./assets/logo.png";
import Mixer from "./components/mixer/Mixer";
import MixerModal from "./components/mixer/MixerModal";
import AppContextProvider from "./context/AppContext";
// import GenreDropdown from "./components/genreDropdown/GenreDropdown";
import NowPlaying from "./components/nowPlaying/NowPlaying";
import Scene from "./components/scene/Scene";
import SceneBg from "./components/sceneBg/SceneBg";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { RiFullscreenFill, RiFullscreenExitLine, GiTacos } from "./imports/icons";
import Tooltip from "./components/tooltip/Tooltip";
import SceneModal from "./components/scene/SceneModal";

function App() {
  const [isSleep, setIsSleep] = useState(false);

  const handle = useFullScreenHandle();

  const handleFullscreen = () => {
    if (handle.active) {
      handle.exit();
    } else {
      handle.enter();
    }
  };

  let timeout;
  useEffect(() => {
    const onMouseMove = () => {
      setIsSleep(false);
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        setIsSleep(true);
      }, 15000);
    };
    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

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

          {/* Header */}
          <div
            className="melofi__header"
            style={
              isSleep
                ? { animation: "slide-up 0.4s forwards" }
                : { animation: "slide-down 0.4s forwards" }
            }
          >
            <nav id="nav" className="melofi__nav">
              <div className="melofi__logo">
                <img src={logo} alt="melofi logo" />
              </div>

              <div className="melofi__rightSide">
                {/* GenreDropdown will be a future feature */}
                {/* <GenreDropdown /> */}
                <Mixer />
                <MusicControls />
                <Scene />
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
          </div>

          <MixerModal />
          <SceneModal />

          {/* Footer */}
          <div
            className="melofi__footer"
            style={
              isSleep
                ? { animation: "slide-footer-down 0.4s forwards" }
                : { animation: "slide-footer-up 0.4s forwards" }
            }
          >
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
        </div>
      </FullScreen>
    </AppContextProvider>
  );
}

export default App;

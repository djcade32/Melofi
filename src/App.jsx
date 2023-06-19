import React, { useState, useEffect } from "react";
import "./App.css";

import MusicControls from "./components/musicControls/MusicControls";
import Clock from "./components/clock/Clock";
import logo from "./assets/logo.png";
import MixerButton from "./components/mixer/MixerButton";
import MixerModal from "./components/mixer/MixerModal";
import AppContextProvider from "./context/AppContext";
// import GenreDropdown from "./components/genreDropdown/GenreDropdown";
import NowPlaying from "./components/nowPlaying/NowPlaying";
import SceneButton from "./components/scene/SceneButton";
import SceneBg from "./components/sceneBg/SceneBg";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { RiFullscreenFill, RiFullscreenExitLine, GiTacos, BsPhoneFill } from "./imports/icons";
import Tooltip from "./components/tooltip/Tooltip";
import SceneModal from "./components/scene/SceneModal";
import ToolsMenu from "./components/tools/ToolsMenu";

function App() {
  const [isSleep, setIsSleep] = useState(false);
  const [onMobileDevice, setOnMobileDevice] = useState(window.innerWidth < 750 ? true : false);

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

  useEffect(() => {
    const updateDimension = () => {
      if (window.innerWidth < 750) {
        setOnMobileDevice(true);
      } else if (window.innerWidth > 750) {
        setOnMobileDevice(false);
      }
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, []);

  return (
    <AppContextProvider>
      <FullScreen handle={handle}>
        {!onMobileDevice ? (
          <div className="App" id="app" style={isSleep ? { cursor: "none" } : {}}>
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
                  <MixerButton />
                  <MusicControls />
                  <SceneButton />
                  <ToolsMenu isSleep={isSleep} />
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
        ) : (
          <div className="App" style={{ backgroundColor: "var(--color-primary)" }}>
            <SceneBg />
            <img src={logo} alt="melofi logo" style={{ width: 122, height: 122 }} />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: 15,
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                width: "50%",
                marginRight: "auto",
                marginLeft: "auto",
              }}
            >
              <BsPhoneFill size={70} color="var(--color-effect)" />
              <p
                style={{
                  fontFamily: "var(--font-poppins)",
                  fontSize: 21,
                  color: "white",
                  textAlign: "center",
                }}
              >
                Melofi is not available on mobile devices
              </p>
            </div>
          </div>
        )}
      </FullScreen>
    </AppContextProvider>
  );
}

export default App;

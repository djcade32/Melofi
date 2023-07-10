import React from "react";
import "./appHome.css";

import logo from "../assets/logo.png";
import { BsPhoneFill } from "../imports/icons";
import SceneBg from "../components/sceneBg/SceneBg";

const MobileView = () => {
  return (
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
            fontFamily: "var(--font-primary)",
            fontSize: 21,
            color: "white",
            textAlign: "center",
          }}
        >
          Melofi is not available on mobile devices
        </p>
      </div>
    </div>
  );
};

export default MobileView;

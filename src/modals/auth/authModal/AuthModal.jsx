import React, { useState } from "react";
import "./authModal.css";
import { useAppContext } from "../../../context/AppContext";
import logo from "../../../assets/logo.png";
import { IoCloseOutline } from "../../../imports/icons";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import { getWidgetDisplayPosition } from "../../../helpers/common";

const AuthModal = () => {
  const { showAuthModal, setShowAuthModal, openWidgets } = useAppContext();

  const [LoggingIn, setLoggingIn] = useState(true);
  return (
    <div
      className="--widget-container melofi__authModal"
      style={{
        display: showAuthModal ? "flex" : "none",
        zIndex: 10 + getWidgetDisplayPosition(openWidgets, "AuthModal"),
      }}
    >
      <IoCloseOutline
        size={25}
        color="var(--color-secondary)"
        onClick={() => setShowAuthModal((prev) => !prev)}
        style={{ cursor: "pointer", position: "absolute", top: 20, right: 20 }}
      />
      <img src={logo} alt="Melofi logo" style={{ width: 150 }} />
      {LoggingIn ? <Login setLoggingIn={setLoggingIn} /> : <Signup setLoggingIn={setLoggingIn} />}
    </div>
  );
};

export default AuthModal;

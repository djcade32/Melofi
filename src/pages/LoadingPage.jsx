import React from "react";
import logo from "../assets/logo.png";

const LoadingPage = () => {
  return (
    <div
      style={{
        backgroundColor: "#232323",
        width: "100%",
        height: "100vh",
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <p
          style={{
            textAlign: "center",
            color: "white",
            fontFamily: "var(--font-primary)",
            fontSize: 21,
            letterSpacing: 5,
          }}
        >
          LOADING
        </p>
        <img
          src={logo}
          alt="melofi logo"
          style={{
            width: 200,
            height: 200,
            animation: "logo-spin 5s linear infinite",
          }}
        />
      </div>
    </div>
  );
};

export default LoadingPage;

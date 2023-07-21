import React from "react";
import "./signup.css";
import { Link } from "react-router-dom";

const Signup = ({ setLoggingIn }) => {
  return (
    <div className="melofi__signup">
      <p>Sign up for a free account</p>
      <div className="melofi__signup_inputContainer">
        <input placeholder="Email" />
        <input placeholder="Password" type="password" />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p style={{ fontSize: 12 }}>By signing up, you agree to our</p>
        <Link
          style={{
            color: "var(--color-effect-opacity)",
            fontSize: 12,
            textAlign: "center",
          }}
          to={"/privacyPolicy"}
          target="_blank"
        >
          Privacy Policy
        </Link>
      </div>
      <p className="melofi__signup_button">Sign Up</p>

      <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
        <p>Already have an account?</p>
        <p className="melofi__signup_link" onClick={() => setLoggingIn((prev) => !prev)}>
          Log In
        </p>
      </div>
    </div>
  );
};

export default Signup;

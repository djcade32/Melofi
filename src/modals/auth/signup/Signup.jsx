import React, { useState } from "react";
import "./signup.css";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = ({ setLoggingIn }) => {
  const { authUser, setUser, setShowAuthModal } = useAppContext();
  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
    error: "",
  });

  const createAccount = async () => {
    checkValidForm();
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        authUser,
        formInputs.email,
        formInputs.password
      );
      console.log("userCreds: ", userCredentials.user);
      setUser(userCredentials.user);
      resetForm();
      setShowAuthModal(false);
      setLoggingIn(true);
    } catch (error) {
      if (error.message.includes("email-already-in-use")) {
        setFormInputs({ ...formInputs, error: "Email already exist." });
      }
    }
  };

  const checkValidForm = () => {
    let emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (formInputs.email.length <= 0 || formInputs.password.length <= 0) {
      setFormInputs({ ...formInputs, error: "Must fill in blanks." });
      return;
    }
    if (!emailRegex.test(formInputs.email)) {
      setFormInputs({ ...formInputs, error: "Must enter valid email." });
    }
  };

  const resetForm = () => {
    setFormInputs({ email: "", password: "", error: "" });
  };
  return (
    <div className="melofi__signup">
      <p>Sign up for a free account</p>
      <div className="melofi__signup_inputContainer">
        <input
          placeholder="Email"
          value={formInputs.email}
          onChange={(e) => setFormInputs({ ...formInputs, email: e.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          value={formInputs.password}
          onChange={(e) => setFormInputs({ ...formInputs, password: e.target.value })}
        />
      </div>
      {formInputs.error !== "" && (
        <p style={{ fontSize: 14, color: "#EE4B2B	" }}>{formInputs.error}</p>
      )}
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
      <p className="melofi__signup_button" onClick={createAccount}>
        Sign Up
      </p>

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

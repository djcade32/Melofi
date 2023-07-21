import React, { useState } from "react";
import "./login.css";
import { useAppContext } from "../../../context/AppContext";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = ({ setLoggingIn }) => {
  const { authUser } = useAppContext();
  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
    error: "",
  });

  const loginWithEmailAndPassword = async () => {
    checkValidForm();

    try {
      const userCredentials = await signInWithEmailAndPassword(
        authUser,
        formInputs.email,
        formInputs.password
      );
      console.log("userCreds: ", userCredentials.user);
      resetForm();
    } catch (error) {
      setFormInputs({ ...formInputs, error: "Wrong username or password. Try again." });
    }
  };

  const checkValidForm = () => {
    let emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (!emailRegex.test(formInputs.email) && formInputs.password.length <= 0) {
      console.log("error!!!");
      return;
    }
  };

  const resetForm = () => {
    setFormInputs({ email: "", password: "", error: "" });
  };
  return (
    <div className="melofi__login">
      <p>Log In to your account</p>
      <div className="melofi__login_inputContainer">
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
        <p style={{ fontSize: 12, color: "#EE4B2B	" }}>{formInputs.error}</p>
      )}
      <p className="melofi__login_button" onClick={loginWithEmailAndPassword}>
        Log In
      </p>
      <p className="melofi__login_link">Forgot password?</p>
      <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
        <p>Don't have an account?</p>
        <p className="melofi__login_link" onClick={() => setLoggingIn((prev) => !prev)}>
          Sign Up for free
        </p>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import "./login.css";
import { useAppContext } from "../../../context/AppContext";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "../../../context/AuthContext";

const Login = ({ setLoggingIn }) => {
  const { auth, setUser } = useAuthContext();
  const { setShowAuthModal, updateUserLastLoginAt } = useAppContext();
  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
    error: "",
  });
  const [resetPasswordInput, setResetPasswordInput] = useState("");
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [resetPasswordLinkSent, setResetPasswordLinkSent] = useState(false);

  const loginWithEmailAndPassword = async () => {
    checkValidForm();

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        formInputs.email,
        formInputs.password
      );
      setUser(userCredentials.user);
      updateUserLastLoginAt();
      resetForm();
      setShowAuthModal(false);
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

  const handleResetPassword = async () => {
    if (resetPasswordInput.length <= 0) {
      return;
    }
    try {
      await sendPasswordResetEmail(auth, resetPasswordInput);
    } catch (error) {
    } finally {
      setResetPasswordLinkSent(true);
      setResetPasswordInput("");
      setTimeout(() => {
        setResetPasswordLinkSent(false);
        setShowPasswordReset(false);
      }, 3000);
    }
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
        <p style={{ fontSize: 14, color: "#EE4B2B	" }}>{formInputs.error}</p>
      )}
      <p className="melofi__login_button" onClick={loginWithEmailAndPassword}>
        Log In
      </p>
      <p className="melofi__login_link" onClick={() => setShowPasswordReset(true)}>
        Forgot password?
      </p>
      <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
        <p>Don't have an account?</p>
        <p className="melofi__login_link" onClick={() => setLoggingIn((prev) => !prev)}>
          Sign Up for free
        </p>
      </div>

      {showPasswordReset && (
        <div className="--widget-container melofi__login_passwordResetModal">
          {!resetPasswordLinkSent ? (
            <>
              <p>Enter email to send reset password link.</p>
              <input
                type="text"
                placeholder="Email"
                value={resetPasswordInput}
                onChange={(e) => setResetPasswordInput(e.target.value)}
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p
                  style={{ cursor: "pointer", color: "var(--color-effect-opacity)" }}
                  onClick={() => setShowPasswordReset(false)}
                >
                  Cancel
                </p>
                <p
                  style={{ cursor: "pointer", color: "var(--color-effect-opacity)" }}
                  onClick={handleResetPassword}
                >
                  Send
                </p>
              </div>
            </>
          ) : (
            <p style={{ textAlign: "center", lineHeight: 1.75 }}>
              If email is found, a reset password link will be sent.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;

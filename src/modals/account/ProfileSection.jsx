import React, { useEffect, useState } from "react";
import "./account.css";
import { useAppContext } from "../../context/AppContext";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
} from "firebase/auth";

const ProfileSection = ({ selected }) => {
  const { user, auth, showAccount } = useAppContext();
  const [emailInput, setEmailInput] = useState({ text: "", error: "" });
  const [editEmail, setEditEmail] = useState(false);
  const [passwordInputs, setPasswordInputs] = useState({
    current: "",
    new: "",
    confirm: "",
    error: "",
  });
  const [showNotification, setShowNotification] = useState({
    showing: false,
    message: "",
    color: "",
  });
  const [showReauthenticateModal, setShowReauthenticateModal] = useState(false);
  const [reauthenticateInput, setReauthenticateInput] = useState("");

  useEffect(() => {
    if (user) {
      setEmailInput({ text: user?.email, error: "" });
    }
    setPasswordInputs({
      current: "",
      new: "",
      confirm: "",
      error: "",
    });
  }, [user, showAccount]);

  const handleEditEmail = async () => {
    if (!editEmail) {
      setEditEmail(true);
      return;
    }

    let emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (!emailRegex.test(emailInput.text)) {
      setEmailInput({ ...emailInput, error: "Invalid email." });
      return;
    }

    if (emailInput.text == user.email) {
      setEditEmail(false);
    } else {
      try {
        await updateEmail(user, emailInput.text);
        setEditEmail(false);
        showNotificationToaster("Successfully Updated Email", true);
      } catch (error) {
        if (error.code === "auth/requires-recent-login") {
          setShowReauthenticateModal(true);
        }
      }
    }
  };

  const handleChangePassword = async () => {
    if (passwordInputs.new.length < 6) {
      setPasswordInputs({
        ...passwordInputs,
        error: "New password should be at least 6 characters.",
      });
      return;
    }
    if (passwordInputs.new !== passwordInputs.confirm) {
      setPasswordInputs({
        ...passwordInputs,
        error: "New password and confirmation password does not match.",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, user.email, passwordInputs.current);
      try {
        await updatePassword(user, passwordInputs.new);
        showNotificationToaster("Successfully Changed Password", true);
        setPasswordInputs({ current: "", new: "", confirm: "" });
      } catch (error) {
        console.log("Error saving password.");
        showNotificationToaster("Error Saving Password", false);
      }
    } catch (error) {
      setPasswordInputs({
        ...passwordInputs,
        error: "Current password is incorrect.",
      });
    }
  };

  const handleReauthenticate = async () => {
    const credential = EmailAuthProvider.credential(user.email, reauthenticateInput);
    try {
      await reauthenticateWithCredential(user, credential);
      setShowReauthenticateModal(false);
    } catch (error) {
      console.log("error: ", error);
    }
    handleEditEmail();
  };

  const showNotificationToaster = (text, success) => {
    setShowNotification({ showing: true, message: text, color: success ? "#4BB543" : "#EE4B2B" });
    setTimeout(() => {
      setShowNotification({ showing: false, message: "" });
    }, 3000);
  };

  return (
    <div
      className="melofi__account_content"
      style={{ display: selected === "profile" ? "flex" : "none" }}
    >
      <div className="melofi__account_content_subsection">
        <div className="melofi__account_inputContainer">
          <p>Email</p>
          <input
            disabled={!editEmail}
            type="text"
            value={emailInput.text}
            placeholder="Email"
            onChange={(e) => setEmailInput({ text: e.target.value, error: "" })}
          />
        </div>
        {emailInput.error !== "" && (
          <p style={{ fontSize: 14, color: "#EE4B2B	" }}>{emailInput.error}</p>
        )}
        <p className="melofi__account_subsection_button" onClick={handleEditEmail}>
          {editEmail ? "Save" : "Update"} Email
        </p>
      </div>
      <div className="melofi__account_content_subsection">
        <p className="melofi__account_subtitle" style={{ fontSize: 18 }}>
          Change Password
        </p>
        <div className="melofi__account_inputContainer">
          <p>Current Password</p>
          <input
            type="password"
            placeholder="Current Password"
            value={passwordInputs.current}
            onChange={(e) => setPasswordInputs({ ...passwordInputs, current: e.target.value })}
          />
        </div>
        <div className="melofi__account_inputContainer">
          <p>New Password</p>
          <input
            type="password"
            placeholder="New Password"
            value={passwordInputs.new}
            onChange={(e) => setPasswordInputs({ ...passwordInputs, new: e.target.value })}
          />
        </div>
        <div className="melofi__account_inputContainer">
          <p>Confirm Password</p>
          <input
            type="password"
            placeholder="Confirm Password"
            value={passwordInputs.confirm}
            onChange={(e) => setPasswordInputs({ ...passwordInputs, confirm: e.target.value })}
          />
        </div>
        {passwordInputs.error !== "" && (
          <p style={{ fontSize: 14, color: "#EE4B2B	" }}>{passwordInputs.error}</p>
        )}
        <p className="melofi__account_subsection_button" onClick={handleChangePassword}>
          Update Password
        </p>
      </div>
      {showNotification.showing && (
        <div
          className="melofi__account_notification"
          style={{ backgroundColor: showNotification.color }}
        >
          <p>{showNotification.message}</p>
        </div>
      )}
      {showReauthenticateModal && (
        <div className="--widget-container melofi__account_reauthenticateModal">
          <p>Enter your password to make change</p>
          <input
            type="password"
            placeholder="Password"
            value={reauthenticateInput}
            onChange={(e) => setReauthenticateInput(e.target.value)}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p
              style={{ cursor: "pointer", color: "var(--color-effect-opacity)" }}
              onClick={() => setShowReauthenticateModal(false)}
            >
              Cancel
            </p>
            <p
              style={{ cursor: "pointer", color: "var(--color-effect-opacity)" }}
              onClick={handleReauthenticate}
            >
              Submit
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;

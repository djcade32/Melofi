import React, { useState } from "react";
import "./account.css";
import { useAppContext } from "../../context/AppContext";
import { IoCloseOutline } from "../../imports/icons";
import ProfileSection from "./ProfileSection";
import InsightsSection from "./InsightsSection";
import { signOut } from "firebase/auth";

const Account = () => {
  const { showAccount, setShowAccount, authUser, setUser } = useAppContext();
  const [selected, setSelected] = useState("profile");

  const handleLogout = async () => {
    try {
      await signOut(authUser);
      setUser(null);
      setShowAccount(false);
      setSelected("profile");
    } catch (error) {}
  };
  return (
    <div
      className="--widget-container melofi__account"
      style={{ display: showAccount ? "flex" : "none", padding: "20px 0px" }}
    >
      <IoCloseOutline
        size={30}
        color="var(--color-secondary)"
        onClick={() => setShowAccount((prev) => !prev)}
        style={{ cursor: "pointer", position: "absolute", top: 20, right: 20 }}
      />
      <div style={{ display: "flex", marginTop: 35, height: "100%" }}>
        <div
          style={{
            borderRight: "1px solid var(--color-secondary-opacity)",
            fontSize: 18,
          }}
        >
          <p
            className={`melofi__account_sectionTitle ${
              selected === "profile" && "melofi__account_sectionTitle_selected"
            }`}
            onClick={() => setSelected("profile")}
          >
            Profile
          </p>
          <p
            className={`melofi__account_sectionTitle ${
              selected === "insights" && "melofi__account_sectionTitle_selected"
            }`}
            onClick={() => setSelected("insights")}
          >
            Insights
          </p>
          <p
            className="melofi__account_sectionTitle"
            style={{ marginTop: 30 }}
            onClick={handleLogout}
          >
            Logout
          </p>
        </div>
        <ProfileSection selected={selected} />
        <InsightsSection selected={selected} />
      </div>
    </div>
  );
};

export default Account;

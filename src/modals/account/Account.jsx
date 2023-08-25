import React, { useState } from "react";
import "./account.css";
import { useAppContext } from "../../context/AppContext";
import { IoCloseOutline } from "../../imports/icons";
import ProfileSection from "./ProfileSection";
// import InsightsSection from "./InsightsSection";
const InsightsSection = React.lazy(() => import("./InsightsSection"));
import { signOut } from "firebase/auth";
import AchievementModal from "../../components/achievementModal/achievementModal";
import { useAuthContext } from "../../context/AuthContext";
import playlist from "../../data/playlist";
import { getWidgetDisplayPosition } from "../../helpers/common";

const Account = () => {
  const { auth, setUser } = useAuthContext();
  const { showAccount, setShowAccount, setSelectedPlaylist, openWidgets } = useAppContext();
  const [selected, setSelected] = useState("profile");
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [achievementModalInfo, setAchievementModalInfo] = useState(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setShowAccount(false);
      setSelected("profile");
      setSelectedPlaylist(playlist[0]);
    } catch (error) {}
  };
  return (
    <div
      className="--widget-container melofi__account"
      style={{
        display: showAccount ? "flex" : "none",
        zIndex: 10 + getWidgetDisplayPosition(openWidgets, "AccountModal"),
      }}
    >
      <IoCloseOutline
        size={30}
        color="var(--color-secondary)"
        onClick={() => setShowAccount((prev) => !prev)}
        style={{ cursor: "pointer", position: "absolute", top: 20, right: 20 }}
      />
      <div style={{ display: "flex", height: "100%", marginTop: 35 }}>
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
        <div style={{ position: "relative" }}>
          <ProfileSection selected={selected} />
          <InsightsSection
            selected={selected}
            setShowAchievementModal={setShowAchievementModal}
            setAchievementModalInfo={setAchievementModalInfo}
          />
          {showAchievementModal && (
            <AchievementModal
              setShowAchievementModal={setShowAchievementModal}
              badge={achievementModalInfo}
              setAchievementModalInfo={setAchievementModalInfo}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;

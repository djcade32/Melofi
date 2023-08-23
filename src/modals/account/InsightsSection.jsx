import React, { useEffect, useState } from "react";
import "./account.css";
import { BsInfoCircle } from "../../imports/icons";
import Tooltip from "../../components/tooltip/Tooltip";
import { badgesMap } from "../../data/badges";
import { useAuthContext } from "../../context/AuthContext";

const InsightsSection = ({ selected, setShowAchievementModal, setAchievementModalInfo }) => {
  const { user, userData } = useAuthContext();
  const [userInsights, setUserInsights] = useState(null);

  useEffect(() => {
    if (user) {
      setUserInsights(userData);
    }
  }, [userData]);

  const handleShowAchievement = (badge) => {
    setAchievementModalInfo(badge);
    setShowAchievementModal(true);
  };

  return (
    <div
      className="melofi__account_content"
      style={{ display: selected === "insights" ? "flex" : "none", overflow: "scroll" }}
    >
      <div className="melofi__insights_statContainer">
        <p style={{ color: "var(--color-secondary" }}>Last login time</p>
        <span>{userInsights?.lastLoginAt}</span>
      </div>
      <div className="melofi__insights_statContainer">
        <div style={{ display: "flex", alignItems: "center", columnGap: 10 }}>
          <p style={{ color: "var(--color-secondary" }}>Consecutive days</p>
          <Tooltip text="The amount of consecutive days you have visited Melofi">
            <BsInfoCircle size={15} color="var(--color-secondary" />
          </Tooltip>
        </div>

        <p>
          <span>{userInsights?.consecutiveDays}</span>{" "}
          {userInsights?.consecutiveDays > 1 ? "days" : "day"}
        </p>
      </div>
      <div className="melofi__insights_statContainer">
        <div style={{ display: "flex", alignItems: "center", columnGap: 10 }}>
          <p style={{ color: "var(--color-secondary" }}>Focused time</p>
          <Tooltip text="The total amount of time you have set the timer widget for">
            <BsInfoCircle size={15} color="var(--color-secondary" />
          </Tooltip>
        </div>

        <p>
          <span>{userInsights?.focusedTime.days} </span>
          {userInsights?.focusedTime.days > 1 || userInsights?.focusedTime.days === 0
            ? "days"
            : "day"}
          {", "}
          <span>{userInsights?.focusedTime.hours} </span>
          {userInsights?.focusedTime.hours > 1 || userInsights?.focusedTime.hours === 0
            ? "hours"
            : "hour"}
          {", "}
          <span>{userInsights?.focusedTime.minutes} </span>
          {userInsights?.focusedTime.minutes > 1 || userInsights?.focusedTime.minutes === 0
            ? "minutes"
            : "minute"}
          {" and "}
          <span>{userInsights?.focusedTime.remainingSeconds.toFixed(0)} </span>
          {userInsights?.focusedTime.remainingSeconds > 1 ||
          userInsights?.focusedTime.remainingSeconds === 0
            ? "seconds"
            : "second"}
        </p>
      </div>
      <div className="melofi__insights_statContainer">
        <div style={{ display: "flex", alignItems: "center", columnGap: 10 }}>
          <p style={{ color: "var(--color-secondary" }}>Achievements</p>
          <Tooltip text="Achievements you have earned while using Melofi">
            <BsInfoCircle size={15} color="var(--color-secondary" />
          </Tooltip>
        </div>
        <div className="melofi__insights_badges">
          {userInsights !== null &&
            userInsights?.achievements?.map((badge) => (
              <div
                className="melofi__insights_badgeContainer"
                key={badgesMap[badge].title}
                onClick={() => handleShowAchievement(badgesMap[badge])}
              >
                <img
                  src={badgesMap[badge].img}
                  alt={`${badgesMap[badge].title} badge`}
                  style={{ width: "50%" }}
                />
                <p>{badgesMap[badge].title}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default InsightsSection;

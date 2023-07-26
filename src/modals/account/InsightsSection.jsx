import React, { useEffect, useState } from "react";
import "./account.css";
import { useAppContext } from "../../context/AppContext";
import { doc, onSnapshot } from "firebase/firestore";
import { BsInfoCircle } from "../../imports/icons";
import Tooltip from "../../components/tooltip/Tooltip";
import { consistencyChampion, newbie, taskNinja, zenMaster } from "../../imports/badges";

const badgesMap = {
  consistencyChampion: {
    title: "Consistency Champ",
    img: consistencyChampion,
  },
  newbie: {
    title: "Newbie",
    img: newbie,
  },
  taskNinja: {
    title: "Task Ninja",
    img: taskNinja,
  },
  zenMaster: {
    title: "Zen Master",
    img: zenMaster,
  },
};

const InsightsSection = ({ selected }) => {
  const { db, user } = useAppContext();
  const [userInsights, setUserInsights] = useState(null);

  useEffect(() => {
    let unsub = null;
    if (user) {
      unsub = onSnapshot(doc(db, `users/${user.uid}`), (doc) => {
        const { lastLoginAt, focusedTime, numOfStickyNotes, consecutiveDays, achievements } =
          doc.data();
        setUserInsights({
          lastLoginAt: getDate(lastLoginAt),
          focusedTime: convertTime(focusedTime),
          numOfStickyNotes: numOfStickyNotes,
          consecutiveDays: consecutiveDays,
          achievements: achievements,
        });
      });
    }
  }, [user]);

  const getDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return `${date.toDateString()} ${date.toLocaleTimeString()}`;
  };

  const convertTime = (seconds) => {
    seconds = seconds / 100;
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return { days, hours, minutes, remainingSeconds };
  };

  return (
    <div
      className="melofi__account_content"
      style={{ display: selected === "insights" ? "flex" : "none" }}
    >
      <div className="melofi__insights_statContainer">
        <p style={{ color: "var(--color-secondary" }}>Last login time</p>
        <span>{userInsights?.lastLoginAt}</span>
      </div>
      <div className="melofi__insights_statContainer">
        <div
          style={{ display: "flex", alignItems: "center", columnGap: 10 }}
          onClick={() => console.log("open achievement modal")}
        >
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
          <Tooltip text="Badges you have collected from using Melofi">
            <BsInfoCircle size={15} color="var(--color-secondary" />
          </Tooltip>
        </div>
        <div className="melofi__insights_badges">
          {userInsights?.achievements.map((badge) => (
            <div className="melofi__insights_badgeContainer" key={badgesMap[badge].title}>
              <img src={badgesMap[badge].img} alt="newbie badge" style={{ width: "50%" }} />
              <p>{badgesMap[badge].title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsightsSection;

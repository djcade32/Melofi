import React, { useState, useEffect } from "react";
import "./clock.css";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="melofi__clock-container">
      <p>{formattedTime}</p>
    </div>
  );
};

export default Clock;

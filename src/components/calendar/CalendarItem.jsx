import React from "react";
import "./calendarItem.css";

const CalendarItem = ({ title, startTime, endTime }) => {
  return (
    <div className="melofi__calendarItem-container">
      <div style={{ display: "flex", columnGap: 10, width: "80%" }}>
        <div className="melofi__calendarItem-indicator" />
        <p className="melofi__calendarItem-title">{title}</p>
      </div>
      <div className="melofi__calendarItem-time-container">
        <p>{startTime}</p>
        <p>{endTime}</p>
      </div>
    </div>
  );
};

export default CalendarItem;

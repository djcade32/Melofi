import React from "react";
import "./calendarItem.css";

const CalendarItem = ({ title }) => {
  return (
    <div className="melofi__calendarItem-container">
      <div style={{ display: "flex", columnGap: 10 }}>
        <div className="melofi__calendarItem-indicator" />
        <p className="melofi__calendarItem-title">{title}</p>
      </div>
      <div className="melofi__calendarItem-time-container">
        <p>5:45 AM</p>
        <p>6:45 AM</p>
      </div>
    </div>
  );
};

export default CalendarItem;

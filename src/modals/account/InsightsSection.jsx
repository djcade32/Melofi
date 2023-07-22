import React from "react";
import "./account.css";

const InsightsSection = ({ selected }) => {
  return <div style={{ display: selected === "insights" ? "flex" : "none" }}>Insights</div>;
};

export default InsightsSection;

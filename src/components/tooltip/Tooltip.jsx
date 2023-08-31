import React from "react";
import { Zoom } from "@mui/material";
import { Tooltip as TooltipMui } from "./imports";
import { FaCrown } from "../../imports/icons";

const Tooltip = (props) => {
  const premiumTooltip = (
    <div style={{ display: "flex", columnGap: 5 }}>
      <p>{props.text}</p> <FaCrown size={15} color="var(--color-effect-opacity)" />
    </div>
  );
  return (
    <TooltipMui
      title={props.showPremiumIcon ? premiumTooltip : props.text}
      TransitionComponent={Zoom}
      componentsProps={{
        tooltip: {
          sx: {
            cursor: "default",
            bgcolor: props.bgColor || "var(--color-primary)",
            fontFamily: "var(--font-primary)",
            fontWeight: 400,
            fontSize: 12,
            userSelect: "none",
            textAlign: props.textAlign ? props.textAlign : "center",
            maxWidth: props.width ? props.width : "25ch",
          },
        },
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>{props.children}</div>
    </TooltipMui>
  );
};

export default Tooltip;

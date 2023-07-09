import React from "react";
import { Zoom } from "@mui/material";
import { Tooltip as TooltipMui } from "./imports";

const Tooltip = (props) => {
  return (
    <TooltipMui
      title={props.text}
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
            textAlign: "center",
            maxWidth: "25ch",
          },
        },
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>{props.children}</div>
    </TooltipMui>
  );
};

export default Tooltip;

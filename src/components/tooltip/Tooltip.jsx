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
            bgcolor: "var(--color-primary)",
            fontFamily: "var(--font-family)",
            fontWeight: 400,
            fontSize: 16,
          },
        },
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>{props.children}</div>
    </TooltipMui>
  );
};

export default Tooltip;

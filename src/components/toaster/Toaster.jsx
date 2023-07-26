import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import { SnackbarContent } from "@mui/material";
import { consistencyChampion, newbie, taskNinja, zenMaster } from "../../imports/badges";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const Toaster = ({ text }) => {
  const content = (
    <div style={{ display: "flex", alignItems: "center", columnGap: 10 }}>
      <img src={newbie} alt="" style={{ width: 50 }} />
      <div>
        <p style={{ fontSize: 18, fontWeight: "bold" }}>Achievement Earned</p>
        <p style={{ fontSize: 16 }}>Newbie</p>
      </div>
    </div>
  );

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={true}
      onClose={() => {}}
      TransitionComponent={SlideTransition}
      key={"top" + "center"}
      onClick={() => console.log("clicked achievement")}
    >
      <SnackbarContent
        style={{
          backgroundColor: "rgb(35,35,35)",
          borderRadius: 10,
          border: "1px solid var(--color-effect)",
          // cursor: "pointer",
        }}
        message={content}
      />
    </Snackbar>
  );
};

export default Toaster;

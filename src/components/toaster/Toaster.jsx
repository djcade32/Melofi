import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import { SnackbarContent } from "@mui/material";
import { badgesMap } from "../../data/badges";
import { useAppContext } from "../../context/AppContext";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const Toaster = () => {
  const { newAchievements, showToaster } = useAppContext();

  const content = (
    <div style={{ display: "flex", alignItems: "center", columnGap: 10 }}>
      <img src={badgesMap[newAchievements[0]]?.img} alt="" style={{ width: 50 }} />
      <div>
        <p style={{ fontSize: 18, fontWeight: "bold" }}>Achievement Earned</p>
        <p style={{ fontSize: 16 }}>{badgesMap[newAchievements[0]]?.title}</p>
      </div>
    </div>
  );

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={showToaster}
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

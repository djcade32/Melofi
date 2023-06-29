import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 200,
  bgcolor: "var(--color-secondary)",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  backdropFilter: "blur(10px)",
  outline: "none",
  borderRadius: 10,
  p: 4,
};

export default function TransitionsModal({ isOpen, onClose }) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={() => onClose()}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isOpen}>
          <Box sx={style}>
            <Typography
              id="transition-modal-description"
              sx={{
                fontFamily: "var(--font-poppins)",
                textAlign: "center",
                fontSize: 21,
                color: "white",
              }}
            >
              Time Expired!
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

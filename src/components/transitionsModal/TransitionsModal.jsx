import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
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
  "&:hover": {
    backgroundColor: "var(--color-effect)",
    cursor: "pointer",
  },
};

export default function TransitionsModal({ isOpen, onClose }) {
  const modalRef = React.useRef(null);

  React.useEffect(() => {
    const handleModalClick = (event) => {
      if (modalRef.current && modalRef.current.contains(event.target)) {
        onClose(false);
      }
    };
    document.addEventListener("click", handleModalClick, true);
    return () => {
      document.removeEventListener("click", handleModalClick, true);
    };
  }, []);

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
          <Box sx={style} ref={modalRef}>
            <Typography
              id="transition-modal-description"
              sx={{
                fontFamily: "var(--font-primary)",
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

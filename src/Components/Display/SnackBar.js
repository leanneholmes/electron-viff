import * as React from "react";
import { useEffect } from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DarkAlert = styled(Alert)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  color: theme.palette.common.white,
  "& .MuiAlert-icon": {
    display: "none",
  },
}));

const Toast = ({ trigger }) => {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (trigger.active) {
      setOpen(true);
    }
  }, [trigger]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        {trigger.message === "Preparing PDF file..." ? (
          <DarkAlert
            onClose={handleClose}
            severity={trigger.validation}
            sx={{ width: "100%" }}
          >
            {trigger.message}
          </DarkAlert>
        ) : (
          <Alert
            onClose={handleClose}
            severity={trigger.validation}
            sx={{ width: "100%" }}
          >
            {trigger.message}
          </Alert>
        )}
      </Snackbar>
    </Stack>
  );
};

export default Toast;

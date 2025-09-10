import { IconButton, Snackbar, SnackbarContent, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ErrorIcon from "@mui/icons-material/Error";

export default function MySnackBar({ open, message, onClose }) {
  const theme = useTheme();

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={onClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={message.type === "error" ? 4000 : 2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={onClose}
      >
        <SnackbarContent
          style={{
            backgroundColor:
              message.type === "error"
                ? theme.palette.error.main
                : theme.palette.success.main,
            color: "white",
          }}
          message={
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {message.type === "error" ? <ErrorIcon /> : <TaskAltIcon />}
              {String(message.text)}
            </span>
          }
          action={action}
        />
      </Snackbar>
    </>
  );
}

import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  useTheme,
} from "@mui/material";

function LogoutDialog({ open, onClose }) {
    const theme = useTheme();
  const navigate = useNavigate();

  const handleConfirm = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentUser");
    onClose();
    navigate("/login", { replace: true });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Logout</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to log out?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{color:theme.palette.text.secondary}} variant="text">Cancel</Button>
        <Button onClick={handleConfirm} variant="text" color="error">
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LogoutDialog;

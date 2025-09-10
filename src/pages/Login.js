import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import bcrypt from "bcryptjs";
import { useFormValidation } from "../hooks/useFormValidation";
import InputField from "../hooks/InputField";
import MySnackBar from "../components/js/MySnackBar";

export default function Login() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // REGEX PATTERNS
  const emailRegex = /^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/;

  // GLOBAL VALIDATORS v is the value
  const validators = {
    email: (v) =>
      !v
        ? "Email is required."
        : emailRegex.test(v)
        ? ""
        : "Enter a valid email address (e.g. name@example.com).",

    password: (v) => (!v ? "Password is required." : ""),
  };
  // useFormValidation is a custom hook validation + touched + errors
  const { formInputs, errors, touched, formIsValid, handleChange, handleBlur } =
    useFormValidation({ email: "", password: "" }, validators);

  const getUsers = () => {
    try {
      const raw = localStorage.getItem("data");
      const parsed = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(parsed)) throw new Error();
      return parsed;
    } catch {
      localStorage.setItem("data", JSON.stringify([]));
      return [];
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // DIALOG MODAL
  const [showSignInDialog, setShowSignInDialog] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "success" });

  function openSignInDialog(text, type = "success") {
    setMessage({ text, type });
    setShowSignInDialog(true);
  }
  function handleSignInClose() {
    setShowSignInDialog(false);
  }
  function handleFormSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const users = getUsers();
      const exists = users.find(
        (u) =>
          u.email === formInputs.email &&
          bcrypt.compareSync(formInputs.password, u.password)
      );

      if (exists) {
        // localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(exists));

        openSignInDialog("Login successful!", "success");
        navigate("/home");
      } else {
        openSignInDialog("Email or password is incorrect.", "error");
      }

      setLoading(false);
    }, 1000);
  }

  return (
    <>
      {/* SIGN IN MODAL */}
      <MySnackBar
        open={showSignInDialog}
        message={message}
        onClose={handleSignInClose}
      />

      <AppBar
        position="static"
        sx={{ backgroundColor: "white", height: "100vh" }}
      >
        {/* Navbar */}
        <Container maxWidth="xl">
          <Toolbar>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", md: "space-between" },
                width: "100%",
                py: 2,
              }}
            >
              {/* Logo Image */}
              <Box
                component="img"
                src="/images/pets-icon.svg"
                alt="Pets Logo"
                sx={{ display: { xs: "none", sm: "flex" }, height: 30 }}
              />
              <Link to="/signup">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                    textTransform: "none",
                    fontWeight: 600,
                    boxShadow: "none",
                  }}
                >
                  Sign up
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
        {/* Login Form Section */}
        <Container maxWidth="md">
          <Toolbar>
            {/* loign form */}
            <Box
              component="form"
              onSubmit={handleFormSubmit}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                // backgroundColor: "green",
                width: "100%",
                minHeight: "50vh",
                py: 6,
                borderRadius: 2,
                mt: 4,
              }}
              noValidate
            >
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  color: theme.palette.text.primary,
                  fontWeight: "600",
                }}
              >
                Welcome Back
              </Typography>
              <FormControl
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: { xs: "100%", md: "50%" },
                }}
              >
                <InputField
                  label="Email"
                  type="email"
                  name="email"
                  value={formInputs.email}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  touch={touched.email}
                  error={errors.email}
                />
                <InputField
                  label="Password"
                  type="password"
                  name="password"
                  value={formInputs.password}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  touch={touched.password}
                  error={errors.password}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={!formIsValid || loading}
                  sx={{
                    width: "100%",
                    mt: 2,
                    // backgroundColor: "#38E07A",
                    color: theme.palette.text.primary,
                    textTransform: "none",
                    fontWeight: 600,
                    boxShadow: "none",
                    backgroundColor: theme.palette.success.main,
                    "&:disabled": {
                      backgroundColor: theme.palette.grey[400],
                      color: theme.palette.common.white,
                    },
                    "&:hover": {
                      backgroundColor: theme.palette.success.dark,
                      color: theme.palette.common.white,
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </FormControl>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

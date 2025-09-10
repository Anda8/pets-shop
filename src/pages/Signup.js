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
import { v4 as uuidv4 } from "uuid";
import { useTheme } from "@mui/material/styles";
import bcrypt from "bcryptjs";
import InputField from "../hooks/InputField";
import { useFormValidation } from "../hooks/useFormValidation";
import MySnackBar from "../components/js/MySnackBar";

export default function Signup() {
  // SWITCH TO LOGIN FORM
  const navigate = useNavigate();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const initialInputs = {
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
  };

  // REGEX PATTERNS
  const usernameRegex = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;
  const emailRegex = /^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,30}$/;
  const phoneRegex = /^[0-9]{11}$/;

  // GLOBAL VALIDATORS v is the value
  const validators = {
    username: (v) =>
      !v
        ? "Username is required."
        : usernameRegex.test(v)
        ? ""
        : "Username must start with a letter, contain only letters, numbers, or underscores, and be 8–30 characters long.",

    email: (v) =>
      !v
        ? "Email is required."
        : emailRegex.test(v)
        ? ""
        : "Enter a valid email address, like name@example.com.",

    password: (v) =>
      !v
        ? "Password is required."
        : passwordRegex.test(v)
        ? ""
        : "Password must be 8–30 characters and include at least one uppercase letter, one number, and one special character.",
    phoneNumber: (v) =>
      !v
        ? "Phone number is required."
        : phoneRegex.test(v)
        ? ""
        : "Phone number must be 11 digits long.",
  };

  // useFormValidation is a custom hook validation + touched + errors
  const { formInputs, errors, touched, formIsValid, handleChange, handleBlur } =
    useFormValidation(initialInputs, validators);

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

  useEffect(() => {
    getUsers();
  }, []);
  function handleFormSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const hashedPassword = bcrypt.hashSync(formInputs.password, 10);
      const newUser = {
        ...formInputs,
        password: hashedPassword,
        id: uuidv4(),
      };
      let users = getUsers();

      const exists = users.some((u) => u.email === newUser.email);

      if (exists) {
        openSignInDialog(
          "Email already registered. Try logging in instead.",
          "error"
        );
        setLoading(false);
        return;
      }

      users.push(newUser);
      localStorage.setItem("data", JSON.stringify(users));
      openSignInDialog(
        "Account created successfully! Redirecting to login...",
        "success"
      );

      setLoading(false);
      setTimeout(() => navigate("/login"), 1500);
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
      {/*==== SIGN IN MODAL ====*/}

      <AppBar
        position="static"
        sx={{ backgroundColor: "white", minHeight: "100vh" }}
      >
        {/* Navbar */}
        <Container maxWidth="xl">
          <Toolbar>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
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
              {/* LOGIN BUTTON */}
              <Link to="/login">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                    textTransform: "none",
                    mx: { xs: "auto", sm: "0" },
                    fontWeight: 600,
                    boxShadow: "none",
                  }}
                >
                  Log In
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
                width: "100%",
                pt: 2,
                borderRadius: 2,
              }}
              noValidate // FOR CUSTOM VALIDATION
            >
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  color: theme.palette.text.primary,
                  fontWeight: "600",
                }}
              >
                Create Your account
              </Typography>
              <FormControl
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: { xs: "100%", md: "50%" },
                }}
              >
                {/* Name */}
                <InputField
                  label="Username"
                  type="text"
                  name="username"
                  value={formInputs.username}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  touch={touched.username}
                  error={errors.username}
                />
                {/* Email */}
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
                {/* Password */}
                <InputField
                  label="Password"
                  type="password"
                  name="password"
                  value={formInputs.password}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  touch={touched.password}
                  error={errors.password}
                  showStrength={true}
                />

                {/* PhoneNumber */}
                <InputField
                  label="Phone Number"
                  type="tel"
                  name="phoneNumber"
                  value={formInputs.phoneNumber}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  touch={touched.phoneNumber}
                  error={errors.phoneNumber}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={!formIsValid || loading}
                  className={!formIsValid ? "shake" : ""}
                  sx={{
                    width: "100%",
                    mt: 2,
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
                    "Sign Up"
                  )}
                </Button>
              </FormControl>
              <Typography
                variant="body2"
                component="p"
                sx={{ color: theme.palette.secondary.main, mt: 2 }}
              >
                By signing up, you agree to our Terms of Service and Privacy
                Policies.
              </Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

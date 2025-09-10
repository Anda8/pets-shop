import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { usePasswordStrength } from "./usePasswordStrength";

export default function InputField({
  label,
  type = "text",
  name,
  value,
  handleChange,
  handleBlur,
  touch,
  error,
  showStrength = false,
}) {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = name === "password";
  const strength = usePasswordStrength(value);
  return (
    <>
      <FormControl sx={{ mb: 3, width: "100%" }}>
        <FormLabel htmlFor={`${name}-input`} sx={{ textAlign: "start" }}>
          {label}
        </FormLabel>
        <TextField
          type={isPassword && showPassword ? "text" : type}
          id={`${name}-input`}
          name={`${name}`}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(error)}
          helperText={touch && error}
          variant="outlined"
          placeholder={`Enter your ${name}`}
          autoComplete={isPassword ? "new-password" : "off"}
          InputProps={{
            endAdornment: isPassword && (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword((s) => !s)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: error
                  ? theme.palette.error.main
                  : theme.palette.primary.main,
              },
              "&:hover fieldset": {
                borderColor: error
                  ? theme.palette.error.main
                  : theme.palette.primary.main,
              },
              "&.Mui-focused fieldset": {
                borderColor: error
                  ? theme.palette.error.main
                  : theme.palette.primary.main,
              },
            },
          }}
        />
        {showStrength && isPassword && value && strength.level && (
          <Typography
            variant="body2"
            sx={{
              mt: 1,
              color:
                theme.palette[strength.color.split(".")[0]][
                  strength.color.split(".")[1]
                ],
              fontWeight: 600,
              alignSelf: "flex-start",
            }}
          >
            Password strength: {strength.level}
          </Typography>
        )}
      </FormControl>
    </>
  );
}

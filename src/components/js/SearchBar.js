import { Box, TextField, useTheme } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ text }) {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.secondary.main,
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          py: 1,
          px: 1.5,
          mx:0.5,
          width: "80%",
        }}
      >
        <SearchIcon />
        <TextField
          variant="standard"
          InputProps={{
            disableUnderline: true,
            sx: {
              paddingLeft: "5px",
              fontWeight: 500,
              color: theme.palette.secondary.main,
              "&::placeholder": {
                color: theme.palette.secondary.main,
                opacity: 1,
              },
            },
          }}
          sx={{
            border: "none",
            outline: "none",
            width: "100%",
          }}
          placeholder={text}
        />
      </Box>
    </>
  );
}

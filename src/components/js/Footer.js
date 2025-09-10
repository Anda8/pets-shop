import { Box, Container, IconButton, Typography } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
export default function Footer() {
  return (
    <>
      <Box sx={{ py: 3, mt: 4 }}>
        <Container maxWidth="md">
          {/* Links */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              mb: 2,
              color: "#638773",
              flexDirection: { xs: "column", md: "row" }
            }}
          >
            <Typography variant="body2">About Us</Typography>
            <Typography variant="body2">Contact</Typography>
            <Typography variant="body2">FAQ</Typography>
            <Typography variant="body2">Privacy Policy</Typography>
            <Typography variant="body2">Terms of Service</Typography>
          </Box>

          {/* Social Icons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              mb: 2,
              color: "#638773",
            //   flexDirection: { xs: "column", md: "row" }
            }}
          >
            <IconButton color="inherit">
              <HelpOutlineIcon />
            </IconButton>
            <IconButton color="inherit">
              <TwitterIcon />
            </IconButton>
            <IconButton color="inherit">
              <InstagramIcon />
            </IconButton>
          </Box>

          {/* Copyright */}
          <Box sx={{ textAlign: "center", color: "#638773" }}>
            <Typography variant="caption">
              © 2024 Pet Haven. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
}

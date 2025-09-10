import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
// tips API
import { tips } from "../../data/tips";
import { Link, Outlet } from "react-router-dom";

export default function CareTips() {
  return (
    <>
      <Outlet context={{ title: "Pet Care Tips" }} />
      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", mb: 3, textAlign: "start" }}
        >
          Pet Care Tips
        </Typography>
        <Toolbar>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {tips.slice(0, 3).map((tip) => (
              <Card
                key={tip.id}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 2,
                  mb: 2,
                  alignItems: "center",
                  boxShadow: "none",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    cursor: "pointer",
                  },
                }}
              >
                <CardContent
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#638773",
                      fontWeight: 500,
                      textAlign: "start",
                    }}
                  >
                    {tip.category}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {tip.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#638773", mb: 2 }}>
                    {tip.details}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#F0F5F2",
                      color: "#000",
                      textTransform: "none",
                      fontWeight: 600,
                      boxShadow: "none",
                      "&:hover": { backgroundColor: "#E5EBE8" },
                    }}
                  >
                    Read More
                  </Button>
                </CardContent>
                <CardMedia
                  component="img"
                  image={tip.img}
                  alt={tip.title}
                  sx={{
                    width: { xs: "100%", md: "33%" },
                    height: { xs: 200, md: "auto" },
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                />
              </Card>
            ))}
          </Box>
        </Toolbar>
        {/* more products button*/}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            component={Link}
            to="advice"
            variant="outlined"
            size="large"
            sx={{
              borderRadius: "30px",
              px: 4,
              fontWeight: "600",
              textTransform: "none",
            }}
          >
            Explore More Tips
          </Button>
        </Box>
      </Container>
    </>
  );
}

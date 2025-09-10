import { Box, Container, Toolbar } from "@mui/material";

import Navbar from "../components/js/Navbar";
import ProductsList from "../components/js/ProductsList";
import PromotionsList from "../components/js/PromotionsList";
import Footer from "../components/js/Footer";
import CareTips from "../components/js/CareTips";

export default function Home() {
const navbarPages = ["Shop", "Services", "Advice", "Locations"];

  return (
    <>
      <Navbar pages={navbarPages}/>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              alignItems: "center",
              mt: "25px",
              width: "100%",
            }}
          >
            <Box
              sx={{
                position: "relative",
                height: "60vh",
                width: "90%",
                backgroundImage: "url(/images/home.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                borderRadius: "10px",
                textAlign: "center",
                px: 2,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: "50px",
                }}
              >
                <h1>Welcome to Pet Haven</h1>
                <p>
                  Your one-stop shop for all your pet needs. From premium food
                  to expert advice, we've got you covered.
                </p>
              </div>
            </Box>
            <Box mt={2}>
              <ProductsList />

              <PromotionsList />

              <CareTips />
            </Box>
          </Box>
        </Toolbar>
      </Container>
      <Footer />
    </>
  );
}

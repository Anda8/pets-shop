import {
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
import CardProduct from "./CardProduct";
import { products } from "../../data/products";

export default function ProductsList() {

  // const products = [
  //   {
  //     id: uuidv4(),
  //     img: "/images/products/product1.png",
  //     title: "Premium Dog Food",
  //     details: "Nutritious and delicious",
  //   },
  //   {
  //     id: uuidv4(),
  //     img: "/images/products/product2.png",
  //     title: "Interactive Cat Toy",
  //     details: "Keeps your cat entertained",
  //   },
  //   {
  //     id: uuidv4(),
  //     img: "/images/products/product3.png",
  //     title: "Durable Dog Leash",
  //     details: "Strong and comfortable",
  //   },
  //   {
  //     id: uuidv4(),
  //     img: "/images/products/product4.png",
  //     title: "Clumping Cat Litter",
  //     details: "Easy to clean and maintain",
  //   },
  // ];
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", textAlign: "start", my: 3 }}
        >
          Featured Products
        </Typography>

        <Toolbar>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {products.map((product) => (
              <CardProduct product={product} />
            ))}
          </Box>
        </Toolbar>

        {/* more products button*/}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            component={Link}
            to="/featured-products"
            variant="outlined"
            size="large"
            sx={{
              borderRadius: "30px",
              px: 4,
              fontWeight: "600",
              textTransform: "none",
            }}
          >
            Explore More products
          </Button>
        </Box>
      </Container>
    </>
  );
}

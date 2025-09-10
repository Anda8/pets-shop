import { useTheme } from "@emotion/react";
import Navbar from "../components/js/Navbar";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function ShoppingCart() {
  const theme = useTheme();
  const navbarPages = ["Shop", "Services", "Community"];
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  //calc the total price
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    console.log(cart);
  }, []);
  const navigate = useNavigate();

  function handleShoppingCart() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/checkout"); // هنا الصح
    }, 1000);
  }
  return (
    <>
      <Navbar
        pages={navbarPages}
        showSearchIcon={false}
        showFavoriteIcon={false}
        showCartIcon={false}
        cartItems={cart.length}
      />
      <Container maxWidth="md" sx={{ my: 6 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", mb: 2, textAlign: "start" }}
          >
            Shopping Cart
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <Card
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  boxShadow: "none",
                }}
              >
                <CardMedia
                  component="img"
                  image={item.img}
                  alt={item.title}
                  sx={{ width: "10%", mr: 2, borderRadius: 2 }}
                />
                <CardContent sx={{ flexGrow: 1, textAlign: "start" }}>
                  <Typography>{item.title}</Typography>
                  <Typography color="secondary">
                    Quantity: {item.quantity}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Typography>
                    {(item.price * item.quantity).toFixed(2)} EGP
                  </Typography>
                </CardContent>
              </Card>

              // Checkout button
            ))
          ) : (
            <p>No products in cart</p>
          )}
          <Box>
            <Typography
              variant="h6"
              my={2}
              sx={{ textAlign: "start", fontWeight: "bold" }}
            >
              Order Summary
            </Typography>
            {/* Subtotal & Shipping */}
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Box borderTop="3px solid #e0e0e0" p={2} mr={2}>
                <Typography
                  color={theme.palette.secondary.main}
                  textAlign="start"
                >
                  Subtotal
                </Typography>
                <Typography fontWeight={500} textAlign="start">
                  {subtotal.toFixed(2)} EGP
                </Typography>
              </Box>
              <Box borderTop="3px solid #e0e0e0" p={2} sx={{ flexGrow: 1 }}>
                <Typography
                  color={theme.palette.secondary.main}
                  textAlign="start"
                >
                  Shipping
                </Typography>
                <Typography fontWeight={500} textAlign="start">
                  Free
                </Typography>
              </Box>
            </Box>
            {/* Tax & Total */}
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Box borderTop="3px solid #e0e0e0" p={2} mr={2}>
                <Typography
                  color={theme.palette.secondary.main}
                  textAlign="start"
                >
                  Estimated Tax
                </Typography>
                <Typography fontWeight={500} textAlign="start">
                  {tax.toFixed(2)} EGP
                </Typography>
              </Box>
              <Box borderTop="3px solid #e0e0e0" p={2} sx={{ flexGrow: 1 }}>
                <Typography
                  color={theme.palette.secondary.main}
                  textAlign="start"
                >
                  Total
                </Typography>
                <Typography fontWeight={600} textAlign="start">
                  {total.toFixed(2)} EGP
                </Typography>
              </Box>
            </Box>
          </Box>
          <Button
            variant="contained"
            onClick={handleShoppingCart}
            disabled={loading}
            sx={{
              display: cart.length === 0 ? "none" : "block",
              // width:"100%",
              alignSelf: "flex-end",
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
              "Proceed to Checkout"
            )}
          </Button>
        </Box>
      </Container>
    </>
  );
}

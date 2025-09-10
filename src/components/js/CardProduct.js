import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CustomTooltip from "./CustomTooltip";
import { useEffect, useState } from "react";
export default function CardProduct({ product }) {
  const theme = useTheme();
  const addToCart = (e) => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.some((c) => c.id === product.id);
    if (exists) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify([...cart, { ...product, quantity: 1 }]) // لو مش موجود نحطه بكمية 1
      );
    }
  };
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!Array.isArray(favorites)) {
      favorites = [];
    }
    setIsFavorite(favorites.some((c) => c.id === product.id));
  }, [product.id]);

  const addToFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!Array.isArray(favorites)) {
      favorites = [];
    }

    if (isFavorite) {
      favorites = favorites.filter((c) => c.id !== product.id);
       window.location.reload();
    } else {
      favorites.push(product);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);

  };

  return (
    <>
      <Card
        key={product.id}
        sx={{
          boxShadow: "none",
          flex: "1 1 calc(100% / 5 - 16px)",
          mr: 1,
          maxWidth: 300,
          minWidth: 150,
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "translateY(-5px)",
          },
          position: "relative",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
          cursor: "pointer",
          "&:hover .card-img": {
            transform: "translateY(-15%)",
            transition: "transform .3s ease-out",
          },
          "&:hover .card-content": {
            backgroundColor: theme.palette.common.white,
            transform: "translateY(-50%)",
            transition: "transform .3s ease-out",
          },
          "&:hover .overlay": {
            opacity: 1, // يظهر عند hover
          },
        }}
      >
        <CardMedia
          className="card-img"
          component="img"
          image={product.img}
          alt={product.title}
          sx={{
            height: 180,
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
        <CardContent className="card-content">
          <Typography variant="subtitle1" fontWeight="600">
            {product.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.secondary.main,
            }}
          >
            {product.details}
          </Typography>
        </CardContent>
        <Box
          onClick={addToCart}
          className="overlay"
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: theme.palette.error.main,
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            py: 1,
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
            opacity: 0,
            transition: "opacity .3s ease-in-out, transform .3s ease-in-out",
            transform: "translateY(100%)", // تحت الكارت
            "&:hover": {
              backgroundColor: theme.palette.error.dark,
            },
            ".MuiCard-root:hover &": {
              opacity: 1,
              transform: "translateY(0)", // يطلع مكانه عند hover
            },
          }}
        >
          <Typography variant="body2">add to cart</Typography>

          <AddShoppingCartIcon />
        </Box>
        <Box
          onClick={addToFavorite}
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            m: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 0.5,
            borderRadius: "50%",
            color: isFavorite
              ? theme.palette.common.white
              : theme.palette.common.black,
            backgroundColor: isFavorite
              ? theme.palette.common.black
              : theme.palette.common.white,
            "&:hover": {
              color: theme.palette.common.white,
              backgroundColor: theme.palette.common.black,
            },
          }}
        >
          <CustomTooltip />
        </Box>
      </Card>
      {/*
       <Card
                key={product.id}
                sx={{
                  boxShadow: "none",
                  mr: 2,
                  position: "relative",
                  flex: "1 1 calc(100% / 5 - 16px)",
                  minWidth: 200,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    cursor: "pointer",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={product.img}
                  alt={product.title}
                  sx={{ height: 180, objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="600">
                    {product.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.secondary.main,
                    }}
                  >
                    {product.details}
                  </Typography>
                </CardContent>
       </Card> 
    */}
    </>
  );
}

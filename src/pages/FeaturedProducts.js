import {
  Box,
  Container,
  Pagination,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
// COMPONENTS
import Navbar from "../components/js/Navbar";
// products API
import { CATEGORIES, products } from "../data/products";
// ICONS
import CardProduct from "../components/js/CardProduct";
import FilterButtons from "../components/js/FilterButtons";
import SearchBar from "../components/js/SearchBar";

export default function FeaturedProducts() {
  const navbarPages = ["Shop", "Services", "About Us", "Contact"];

  //   FILTER products category
  const [displayedFeaturedProductsType, setDisplayedFeaturedProductsType] =
    useState("food");
  const filteredProducts = useMemo(() => {
    switch (displayedFeaturedProductsType) {
      case "food":
        return products.filter((t) => t.category === CATEGORIES.FOOD);
      case "toys":
        return products.filter((t) => t.category === CATEGORIES.TOYS);
      case "accessories":
        return products.filter((t) => t.category === CATEGORIES.ACCESSORIES);
      case "grooming":
        return products.filter((t) => t.category === CATEGORIES.GROOMING);
      case "health":
        return products.filter((t) => t.category === CATEGORIES.HEALTH);
      default:
        return products;
    }
  }, [displayedFeaturedProductsType, products]);
  const changeDisplayedType = (event, newValue) => {
    if (newValue !== null) {
      setDisplayedFeaturedProductsType(newValue);
      // setPage(1);
    }
  };
  //   Pagination pages
  const [page, setPage] = useState(1);
  const ItemsPerPage = 8;
  const displayedProducts = filteredProducts.slice(
    (page - 1) * ItemsPerPage,
    page * ItemsPerPage
  );
  const handleChangePage = (e, value) => {
    setPage(value);
  };

  return (
    <>
      <Navbar pages={navbarPages} showProfile={false} />
      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", mb: 2, textAlign: "start" }}
          >
            Featured Products
          </Typography>

          <SearchBar text="Search for products" />
        </Box>

        {/* FILTER BUTTONS  */}
        <FilterButtons
          value={displayedFeaturedProductsType}
          options={["food", "toys", "accessories", "grooming", "health"]}
          onChange={changeDisplayedType}
        />
        {/* ======== FILTER BUTTONS =======  */}
        {/* CONTENT */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          {displayedProducts.map((product) => (
            <CardProduct product={product} />
          ))}
        </Box>
        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            page={page}
            onChange={handleChangePage}
            count={Math.ceil(filteredProducts.length / ItemsPerPage)}
            color="background"
          />
        </Box>
        {/* ======== Pagination ======== */}
      </Container>
    </>
  );
}

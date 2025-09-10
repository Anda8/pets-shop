import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Pagination,
  Typography,
  useTheme,
} from "@mui/material";
import { useMemo, useState } from "react";
// COMPONENTS
import Navbar from "../components/js/Navbar";
// tips API
import { tips } from "../data/tips";
import { CATEGORIES } from "../data/tips";

// ICONS
import FilterButtons from "../components/js/FilterButtons";
import SearchBar from "../components/js/SearchBar";

export default function TipsPage() {
  const theme = useTheme();
  const navbarPages = ["Shop", "Services", "Locations", "Care"];

  //   FILTER tips category
  const [displayedTipsCareType, setDisplayedTipsCareType] =
    useState("dog-care");
  const filteredTips = useMemo(() => {
    switch (displayedTipsCareType) {
      case "dog-care":
        return tips.filter((t) => t.category === CATEGORIES.DOG);
      case "cat-care":
        return tips.filter((t) => t.category === CATEGORIES.CAT);
      case "health":
        return tips.filter((t) => t.category === CATEGORIES.HEALTH);
      case "training":
        return tips.filter((t) => t.category === CATEGORIES.TRAINING);
      default:
        return tips;
    }
  }, [displayedTipsCareType, tips]);
  const changeDisplayedType = (event, newValue) => {
    if (newValue !== null) {
      setDisplayedTipsCareType(newValue);
      setPage(1);
    }
  };
  //   Pagination pages
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;
  const displayedTips = filteredTips.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const handleChangePage = (e, value) => {
    setPage(value);
  };

  return (
    <>
      <Navbar pages={navbarPages} showCartIcon={false} />
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
            Pet Care Tips
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 3, color: theme.palette.secondary.main }}
          >
            Expert advice to keep your furry, scaly, or feathered friends happy
            and healthy.
          </Typography>
          <SearchBar text="Search for tips" />
        </Box>

        {/* FILTER BUTTONS  */}
        <FilterButtons
          value={displayedTipsCareType}
          options={["dog-care", "cat-care", "health", "training"]}
          onChange={changeDisplayedType}
        />
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
          {displayedTips.map((tip) => (
            <Card
              key={tip.id}
              sx={{
                boxShadow: "none",
                flex: "1 1 calc(100% / 4 - 16px)",
                maxWidth: 300,
                minWidth: 200,
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
            >
              <CardMedia
                component="img"
                image={tip.img}
                alt={tip.title}
                sx={{
                  height: 180,
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <CardContent>
                <Typography variant="subtitle1" fontWeight="600">
                  {tip.title}
                </Typography>
                <Typography variant="body2" color="secondary">
                  {tip.details}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            page={page}
            onChange={handleChangePage}
            count={Math.ceil(filteredTips.length / itemsPerPage)}
            color="background"
          />
        </Box>
        {/* ======== Pagination ======== */}
      </Container>
    </>
  );
}

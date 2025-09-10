import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
export default function PromotionsList() {
    const theme = useTheme();
  
  const promotions = [
    {
      id: uuidv4(),
      img: "/images/promotions/promotion1.png",
      title: "Summer Sale",
      details: "Save up to 20% on select items",
    },
    {
      id: uuidv4(),
      img: "/images/promotions/promotion2.png",
      title: "New Arrivals",
      details: "Check out our latest products",
    },
    {
      id: uuidv4(),
      img: "/images/promotions/promotion3.png",
      title: "Loyalty Program",
      details: "Earn points with every purchase",
    },
  ];

  return (
    <>
      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", textAlign: "start", mb: 4 }}
        >
          Promotions
        </Typography>
        <Toolbar disableGutters>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              flexWrap: "wrap",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {promotions.map((promotion) => (
              <Card
                key={promotion.id}
                sx={{
                  boxShadow: "none",
                  flex: "1 1 calc(100% / 3 - 16px)",
                  minWidth: 300,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    cursor:"pointer"
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={promotion.img}
                  alt={promotion.title}
                  sx={{ height: 180, objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="600">
                    {promotion.title}
                  </Typography>
                  <Typography variant="body2" sx={{
                    color:theme.palette.secondary.main
                  }} >
                    {promotion.details}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </>
  );
}

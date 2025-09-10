import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
} from "@mui/material";

const PETFINDER_KEY = "woKcCFyPSTwgZ5douk9nSr9kCkTtvHcJitzIZVGpQ39FrZ0YB6";
const PETFINDER_SECRET = "Rv2Z8ZOxiZz8RplndM04Vh3jaeWo4ZWl2sLjLr5E";

export default function AnimalsList() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    let token = "";

    // 1. نجيب access_token
    axios
      .post("https://api.petfinder.com/v2/oauth2/token", {
        grant_type: "client_credentials",
        client_id: PETFINDER_KEY,
        client_secret: PETFINDER_SECRET,
      })
      .then((res) => {
        token = res.data.access_token;

        // 2. نجيب الحيوانات
        return axios.get("https://api.petfinder.com/v2/animals?type=dog", {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
      .then((res) => {
        console.log(res.data);
        
        setAnimals(res.data.animals);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Pets for Adoption
      </Typography>

      <Grid container spacing={3}>
        {animals.map((animal) => (
          <Grid item xs={12} sm={6} md={4} key={animal.id}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={
                  animal.primary_photo_cropped
                    ? animal.primary_photo_cropped.medium
                    : "https://via.placeholder.com/300x200?text=No+Image"
                }
                alt={animal.name}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="600">
                  {animal.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {animal.breeds.primary} • {animal.age} • {animal.gender}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {animal.description
                    ? animal.description.substring(0, 80) + "..."
                    : "No description available."}
                </Typography>
                <Box mt={2}>
                  <a
                    href={animal.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: "#4CAF50",
                      fontWeight: "bold",
                      textDecoration: "none",
                    }}
                  >
                    View More →
                  </a>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

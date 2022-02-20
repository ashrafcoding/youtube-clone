import { Box, Container, Grid } from "@mui/material";
import React from "react";
import CategoriesBar from "../components/CategoriesBar";
import Video from "../components/Video";

function HomeScreen() {
  return (
    <Container>
      <CategoriesBar />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {[1].map((val) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={val}>
                <Video />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
}

export default HomeScreen;

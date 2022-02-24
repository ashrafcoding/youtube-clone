import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Grid } from "@mui/material";
import CategoriesBar from "../components/CategoriesBar";
import Video from "../components/Video";
import { getPopularVideos } from "../redux/videoAction";
import { RootState } from "../redux/store";

function HomeScreen() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPopularVideos())
  }, [dispatch])

  const videos = useSelector((state: RootState) => state.videos.homeVideos)

  return (
    <Container>
      <CategoriesBar />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          { videos.map((video ) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={video['id']}>
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

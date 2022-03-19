import { Typography, Box, Container, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikedVideos } from "../redux/actions/videoAction";
import SubscriptionScreen from "./SubscriptionScreen";
import Video from "../components/Video";
import { RootState } from "../redux/store";


const LibraryScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLikedVideos());
  }, [dispatch]);
  const videos = useSelector((state: RootState) => state.likedVideos.videos);
  return (
    <Container>
      <Box mb={2}>
        <Typography variant="h4">Library</Typography>
      </Box>
      <SubscriptionScreen />
      <Box mt={2}>
        <Typography variant="h5">Liked Videos</Typography>
      </Box>
      <Grid container spacing={2}>
        {videos.map((video) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={video["id"]}>
              <Video video={video} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default LibraryScreen;

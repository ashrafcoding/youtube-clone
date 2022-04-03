import { Typography, Box, Grid, Divider, Avatar } from "@mui/material";
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
  const { photoUrl, name } = useSelector(
    (state: RootState) => state?.auth?.user
  );
  return (
    <Box mt={2}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <Box mb={2}>
            <Typography variant="h4">Library</Typography>
          </Box>
          <SubscriptionScreen />
          <Divider />
          <Box mt={2}>
            <Typography variant="h5">Liked Videos</Typography>
          </Box>
          <Grid container spacing={2} mt={2}>
            {videos.map((video) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={video["id"]}>
                  <Video video={video} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item xs={0} md={3}>
          <Box mt={2}>
            <Avatar sx={{ m: "auto" }} src={photoUrl} />
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              {name}
            </Typography>
            <Divider />
            <Box display="flex" justifyContent="space-between" p={1}>
              <Typography variant="body2">Subsriptions</Typography>
              <span>35</span>
            </Box>
            <Divider />
            <Box display="flex" justifyContent="space-between" p={1}>
              <Typography variant="body2">Uploads</Typography>
              <span>5</span>
            </Box>
            <Divider />
            <Box display="flex" justifyContent="space-between" p={1}>
              <Typography variant="body2">Likes</Typography>
              <span>35</span>
            </Box>
            <Divider />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LibraryScreen;

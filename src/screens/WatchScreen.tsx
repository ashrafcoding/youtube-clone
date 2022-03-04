import {  CardMedia, Grid } from "@mui/material";
import Comments from "../components/Comments";
import VideoHorizontal from "../components/VideoHorizontal";
import VideoMeta from "../components/VideoMeta";

function WatchScreen() {
  return (
    <Grid container spacing={2}>
      <Grid item lg={8} sx={{height:'60vh',width:'100%'}}>
        <CardMedia
          component="iframe"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          frameBorder={0}
          width="100%"
          height="100%"
          sx={{mb:2}}
        />
        <VideoMeta />
        <Comments/>
      </Grid>
      <Grid item lg={4}>
        {[...Array(10)].map(() => (
          <VideoHorizontal />
        ))}
      </Grid>
    </Grid>
  );
}

export default WatchScreen;

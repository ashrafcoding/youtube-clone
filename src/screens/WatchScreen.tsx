import { CardMedia, Grid } from "@mui/material";
import Comments from "../components/Comments";
import VideoMeta from "../components/VideoMeta";
import VideoHorizontal from "../components/VideoHorizontal";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getVideoById, getRelatedVideos } from "../redux/actions/videoAction";
import { useParams } from "react-router-dom";

function WatchScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    id && dispatch(getRelatedVideos(id));
    id && dispatch(getVideoById(id));
  }, [dispatch, id]);

  const {
    videos: { homeVideos },
    selectedVideo: { video },
  } = useSelector((state: RootState) => state);

  return (
    <Grid container spacing={2}>
      <Grid item md={8} sx={{ height: "55vh", width: "100%" }}>
        <CardMedia
          component="iframe"
          src={`https://www.youtube.com/embed/${id}`}
          frameBorder={0}
          width="100%"
          height="100%"
          sx={{ mb: 2 }}
        />
        <VideoMeta />
        <Comments videoId={`${id}`} commentCount={`${video?.commentCount}`} />
      </Grid>
      <Grid item md={4}>
        {homeVideos.map((video) => (
            <VideoHorizontal video={video} key={video["id"]}/>
        ))}
      </Grid>
    </Grid>
  );
}

export default WatchScreen;

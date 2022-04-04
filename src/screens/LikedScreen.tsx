import { Typography, Box, Divider, Avatar } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikedVideos } from "../redux/actions/videoAction";
import VideoHorizontal from "../components/VideoHorizontal";
import { RootState } from "../redux/store";

const LikedScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLikedVideos());
  }, [dispatch]);
  const videos = useSelector((state: RootState) => state?.likedVideos?.videos);
  
  const url = videos? videos[0]["url"] : "";
  const { photoUrl, name } = useSelector(
    (state: RootState) => state?.auth?.user
  );
  return (
    <Box mt={2} display="flex" gap={6}>
      <Box sx={{ width: "312px" }}>
        <img src={url} alt="liked" />
        <Typography variant="h5" my={4}> Liked Videos</Typography>
        <Divider />
        <Box mt={2} display="flex">
          <Avatar src={photoUrl} />
          <Typography variant="h6" ml={2}>
            {name}
          </Typography>
          </Box>
      </Box>
      
      <Box sx={{width:"calc(100%-312)"}}>
        {videos.map((video) => (
          <VideoHorizontal video={video} key={video["id"]} />
        ))}
      </Box>
    </Box>
  );
};

export default LikedScreen;

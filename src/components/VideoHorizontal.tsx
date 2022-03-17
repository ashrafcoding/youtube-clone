import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import moment from "moment";
import numeral from "numeral";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";

type Movie = RootState["videos"]["homeVideos"][number];

function VideoHorizontal({ video }: { video: Movie }) {
  const {
    channelTitle,
    title,
    publishedAt,
    url,
    iconUrl,
    viewCount,
    duration,
  } = video;

  const views = numeral(viewCount).format("0.a");
  const fromNow = moment(publishedAt).fromNow();

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/watch/${video["id"]}`);
  };

  return (
    <Card
      sx={{ cursor: "pointer", position: "relative", display: "flex" }}
      onClick={handleClick}
      elevation={0}
    >
      <CardMedia component="img" image={url} sx={{ width: "50%", mb: 1 }} />
      <Box
        sx={{ position: "absolute", left: "35%", top: "75%", color: "white" }}
      >
        {_duration}
      </Box>
      <CardContent sx={{width:'50%'}}>
        <Box sx={{ height: 30, width: 30 }}>
          <CardMedia
            sx={{ borderRadius: "50%" }}
            component="img"
            image={iconUrl}
            alt="icon"
          />
        </Box>
        <Box
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            overflowWrap: "break-word",
            textOverflow: "ellipsis",
          }}
        >
          <Typography>{title}</Typography>
          <Typography component="h6">{channelTitle}</Typography>
          <Typography variant="caption">{`${views} views . ${fromNow}`}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default VideoHorizontal;

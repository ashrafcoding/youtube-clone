import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import moment from "moment";
import numeral from "numeral";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";

type Movie = RootState["videos"]["homeVideos"][number];

function Video({ video }: { video: Movie }) {
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
      sx={{ cursor: "pointer", position: "relative" }}
      onClick={handleClick}
    >
      <CardMedia component="img" image={url}  />
      <Box
        sx={{ position: "absolute", right: "5%", bottom: "45%", color: "white" }}
      >
        {_duration}
      </Box>
      <CardContent sx={{ display: "flex", gap: 2 }}>
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

export default Video;

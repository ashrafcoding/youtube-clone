import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import numeral from "numeral";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import { RootState } from "../redux/store";
type Movie = RootState["videos"]["homeVideos"][number];

function Video({ video }: { video: Movie }) {
  const [iconUrl, setIconUrl] = useState();
  const [viewCount, setViewCount] = useState(0);
  const {
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: {
        medium: { url },
      },
    },
  } = video;
 
  useEffect(() => {
    const getIcon = async () => {
      const { data } = await axios.get(
        "https://www.googleapis.com/youtube/v3/channels",
        {
          params: {
            part: "snippet,statistics",
            id: channelId,
            key: process.env.REACT_APP_YOUTUBE_API_KEY,
          },
        }
      );
      const { items } = data;           
      const {
        snippet: {
          thumbnails: {
            medium: { url: iconUrl },
          },
        },
        statistics:{viewCount}
      } = items[0];
      setIconUrl(iconUrl);
      setViewCount(viewCount);
    };
    getIcon();
  }, [channelId]);

  const views = numeral(viewCount).format("0.0a");
  const fromNow = moment(publishedAt).fromNow();

  return (
    <Card sx={{ cursor: "pointer" }} >
      <CardMedia component="img" image={url} />
      <CardContent sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ height: 40, width: 40 }}>
          <CardMedia
            sx={{ borderRadius: "50%" }}
            component="img"
            image={iconUrl}
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

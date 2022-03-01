import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import axios from "axios";
import moment from "moment";
import numeral from "numeral";
import { useEffect, useState } from "react";
import { RootState } from "../redux/store";

type Movie = RootState["videos"]["homeVideos"][number];

function Video({ video }: { video: Movie }) {
  const [iconUrl, setIconUrl] = useState();
  const [viewCount, setViewCount] = useState();
  const {
    id,
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

  const videoId = id["videoId"] || id;

  const views = numeral(viewCount).format("0.a");
  const fromNow = moment(publishedAt).fromNow();

  useEffect(() => {
    const getIcon = async () => {
      const { data } = await axios.get(
        "https://www.googleapis.com/youtube/v3/channels",
        {
          params: {
            part: "snippet",
            id: channelId,
            key: process.env.REACT_APP_YOUTUBE_API_KEY,
          },
        }
      );
      const { items } = data;
      const {
        snippet: {
          thumbnails: {
            default: { url: iconUrl },
          },
        },
      } = items[0];      
      setIconUrl(iconUrl);
    };
    getIcon();
  }, [channelId]);

  useEffect(() => {
    const getVideoDetails = async () => {
      const {
        data: { items },
      } = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
        params: {
          part: "contentDetails, statistics",
          id: videoId,
          key: process.env.REACT_APP_YOUTUBE_API_KEY,
        },
      });
      const { viewCount } = items[0].statistics;
      setViewCount(viewCount);
    };
    getVideoDetails();
  }, [videoId]);

  return (
    <Card sx={{ cursor: "pointer" }}>
      <CardMedia component="img" image={url} />
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

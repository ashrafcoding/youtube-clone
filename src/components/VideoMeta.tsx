import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  Divider,
  Avatar,
  Button,
  Collapse,
  CardActions,
} from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import moment from "moment";
import numeral from "numeral";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {getChannelDetail, subscriptionStatus} from "../redux/channelAction"

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function VideoMeta() {
  const dispatch = useDispatch();
  const [expand, setExpand] = useState(false);
  const handleExpandClick = () => {
    setExpand(!expand);
  };

  const {
    channelDetails: { channel },selectedVideo: { video },subscription: { subscribed }
  } = useSelector((state: RootState) => state);
  
  useEffect(() => {   
    video?.channelId && dispatch(getChannelDetail(video?.channelId));
    video?.channelId && dispatch(subscriptionStatus(video?.channelId));    
  }, [dispatch, video?.channelId]);


  return (
    <Box ml={2}>
      <Typography variant="h5">{video?.channelTitle}</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 1,
        }}
      >
        <Typography variant="body2">
          {`${numeral(video?.viewCount).format("0,a")} Views . ${moment(
            video?.publishedAt
          ).fromNow()}`}{" "}
          views
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box component="span">
            <ThumbUpOffAltIcon fontSize="small" />
            {numeral(video?.likeCount).format("0,a")}
          </Box>
          <Box component="span">
            <ThumbDownOffAltIcon fontSize="small" />
            {numeral(video?.dislikeCount).format("0,a")}
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar src={channel?.iconUrl} />
          <Box sx={{ ml: 1 }}>
            <Typography component="h4">{video?.channelTitle}</Typography>
            <Typography variant="body2">
              {numeral(channel?.subscribers).format("0,a")} Subscriber
            </Typography>
          </Box>
        </Box>
        <Button variant="contained" sx={{ background: `${subscribed ? "gray" : "red"}` }}>
          {subscribed ? "subscribed" : "Subscribe"}
        </Button>
      </Box>
      <Divider />
      <Typography variant="body2">{video?.title}</Typography>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expand}
          onClick={handleExpandClick}
          aria-expanded={expand}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expand} timeout="auto" unmountOnExit>
        <Typography paragraph>{video?.description}</Typography>
      </Collapse>
    </Box>
  );
}

export default VideoMeta;

import { Avatar, Box, Typography, Divider } from "@mui/material";
import { RootState } from "../redux/store";

import moment from "moment";
type Comment = RootState["commentList"]["comments"][number];

const CommentsItem = ({ comment }: { comment: Comment }) => {
  return (
    <>
      <Box display="flex">
        <Avatar src={comment["authorProfileImageUrl"]} />
        <Box>
          <Typography variant="body2">
            {comment["authorDisplayName"]} .{" "}
            {moment(comment["publishedAt"]).fromNow()}
          </Typography>
          <Typography variant="body2">{comment["textDisplay"]}</Typography>
        </Box>
      </Box>
      <Divider />
    </>
  );
};

export default CommentsItem;

import { Avatar, Box, Typography,Divider } from "@mui/material";
import moment from "moment";

const CommentsItem = () => {
  return (
      <>
    <Box display="flex">
      <Avatar src="https://picsum.photos/200" />
      <Box>
        <Typography variant="body2">
          user name . {moment("2020-06-5").fromNow()}
        </Typography>
        <Typography variant="body2">good video</Typography>
      </Box>
    </Box>
    <Divider />
    </>
  );
};

export default CommentsItem;

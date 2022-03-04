import { Avatar, Box, Button, Divider, TextField } from "@mui/material";
import CommentsItem from "./CommentsItem";

function Comments() {
  const handleComment = () => {
    console.log("comment");
  };
  return (
    <Box>
      <Box display={"flex"}>
        <Avatar src={"https://picsum.photos/200"} />
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleComment}
        >
          <TextField
            id="standard-basic"
            label="write a comment"
            variant="standard"
          />
          <Button>comment</Button>
        </Box>
      </Box>
      <Divider />
      <Box>
        {[...Array(10)].map(() => (
          <CommentsItem />
        ))}
      </Box>
    </Box>
  );
}

export default Comments;

import { Avatar, Box, Button, Divider, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import CommentsItem from "./CommentsItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getComments, addComment } from "../redux/actions/commentsAction.";

function Comments({ videoId }: { videoId: string }) {
  const [text, setText] = useState("")
  const dispatch = useDispatch();


  const handleComment = (e: React.FormEvent<Element>) => {
    e.preventDefault();
    if(text.length === 0) return;
    dispatch(addComment(videoId, text))
    setText("")    
  };

  useEffect(() => {
    dispatch(getComments(videoId));
  }, [dispatch, videoId]);

  const {
    commentList: { comments }, auth:{user}
  } = useSelector((state: RootState) => state);
  
  return (
    <Box>
      <Box display={"flex"}>
        <Avatar src={user['photoUrl']} />
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={(e: React.FormEvent)=>handleComment(e)}
        >
          <TextField
            id="standard-basic"
            label="write a comment"
            variant="standard"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button>comment</Button>
        </Box>
      </Box>
      <Divider />
      <Box>
        {comments.map((comment) => (
          <CommentsItem key={comment['id']} comment={comment}/>
        ))}
      </Box>
    </Box>
  );
}

export default Comments;



import React from "react";
import { Chip, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { getVideosBySearch } from "../redux/videoAction";

function CategoriesBar() {
  const data = [
    "All",
    "Music",
    "Sports",
    "News",
    "Gaming",
    "Lifestyle",
    "How-to",
    "Pets",
    "Movies",
    "TV",
    "Entertainment",
    "Food",
    "Travel",
    "Fashion",
    "Health",
    "Science",
    "Technology",
    "Politics",
    "Business",
    "Education",
  ];

  const dispatch = useDispatch();

  const handleClick = (category: string) => {   
    dispatch(getVideosBySearch(category));
  };

  return (
    <Stack direction={"row"} spacing={2} sx={{ overflow: "scroll", my: 2 }}>
      {data.map((item, index) => (
        <Chip key={index} label={item} variant="outlined" onClick={()=>handleClick(item)} />
      ))}
    </Stack>
  );
}

export default CategoriesBar;

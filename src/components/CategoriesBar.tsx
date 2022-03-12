import React from "react";
import { Chip, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { getVideosByCategory, getPopularVideos } from "../redux/actions/videoAction";
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

  const handleClick = (value: string) => {
    value === "All"
      ? dispatch(getPopularVideos())
      : dispatch(getVideosByCategory(value));
  };

  return (
    <Stack direction={"row"} spacing={2} sx={{ overflow: "scroll", my: 2 }}>
      {data.map((item) => (
        <Chip
          key={item}
          label={item}
          variant="outlined"
          onClick={() => handleClick(item)}
        />
      ))}
    </Stack>
  );
}

export default CategoriesBar;

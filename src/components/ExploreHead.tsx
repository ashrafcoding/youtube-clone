import { Card, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  getVideosByCategory,
  getPopularVideos,
} from "../redux/actions/videoAction";

const ExploreHead = ({ getValue }: { getValue: (arg0: string) => void }) => {
  const data = [
    { id: 1, icon: "./assets/trending.png", text: "Trending" },
    { id: 2, icon: "./assets/music.png", text: "Music" },
    { id: 3, icon: "./assets/live.png", text: "Live" },
    { id: 4, icon: "./assets/gaming.png", text: "Gaming" },
    { id: 5, icon: "./assets/sports.png", text: "Sports" },
  ];
  const dispatch = useDispatch();

  const handleClick = (value: string) => {
    getValue(value);
    value === "All"
      ? dispatch(getPopularVideos())
      : dispatch(getVideosByCategory(value));
  };

  return (
    <Box display="flex" p={3} sx={{ gap: 1, flexWrap: "wrap" }} >
      {data.map((item) => (
        <Card
          sx={{ width: "210px", p: 3 ,cursor: "pointer"}}
          key={item.id}
          onClick={() => handleClick(item.text)}
        >
          <Box sx={{ width: "32px" }}>
            <img src={item.icon} alt={item.text} style={{ width: "100%" }} />
          </Box>
          <Typography variant="h6" color="black">
            {item.text}{" "}
          </Typography>
        </Card>
      ))}
    </Box>
  );
};

export default ExploreHead;

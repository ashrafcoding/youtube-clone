import { Typography, Box } from "@mui/material";
import { useState } from "react";
import ExploreHead from "../components/ExploreHead";

import HomeScreen from "./HomeScreen";

const ExploreScreen = () => {
  const [text, setText] = useState("");
  const getValue = (value: string) => setText(value);
  console.log(text);

  return (
    <Box >
      <ExploreHead getValue={getValue} />
      <Box p={3}>
      <Typography variant="h6" gutterBottom>
        {text || "Trending videos"}
      </Typography>
      </Box>
      
      <HomeScreen show={false} />
    </Box>
  );
};

export default ExploreScreen;

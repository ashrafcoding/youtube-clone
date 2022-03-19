import { Typography, Container } from "@mui/material";
import { useState } from "react";
import ExploreHead from "../components/ExploreHead";

import HomeScreen from "./HomeScreen";

const ExploreScreen = () => {
  const [text, setText] = useState("");
  const getValue = (value: string) => setText(value);
  console.log(text);

  return (
    <Container>
      <ExploreHead getValue={getValue} />
      <Typography variant="h6" gutterBottom>
        {text || "Trending"}
      </Typography>
      <HomeScreen show={false} />
    </Container>
  );
};

export default ExploreScreen;

import React from "react";
import { Box } from "@mui/material";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import HomeScreen from "./screens/HomeScreen";
import { colors } from "./styles/style";

function App() {
  return (
    <div className="App">
      <Header />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
        }}
      >
        <Sidebar responsive={false} />
        <HomeScreen />
      </Box>
    </div>
  );
}

export default App;

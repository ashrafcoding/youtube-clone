import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import HomeScreen from "./screens/HomeScreen";
import SignIn from "./screens/SignIn";

function Layout() {
  return (
    <div className="App">
      <Header />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          width: "85%",
        }}
      >
        <Sidebar responsive={false} />
        <HomeScreen />
      </Box>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}

export default App;

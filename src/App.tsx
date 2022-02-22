import { useEffect } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import HomeScreen from "./screens/HomeScreen";
import SignIn from "./screens/SignIn";
import {RootState} from "./redux/store";

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

  const accessToken = useSelector<RootState>((state) => state.auth.accessToken);
  const isLoading = useSelector<RootState>((state) => state.auth.isLoading);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken && !isLoading) {
      navigate("/signin");
    }
  }, [accessToken, isLoading, navigate]);


  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}

export default App;

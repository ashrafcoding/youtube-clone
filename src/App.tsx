import { Box } from "@mui/material";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import HomeScreen from "./screens/HomeScreen";
import SignIn from "./screens/SignIn";

function App() {
  return (
    <div className="App">
      <SignIn/>
      {/* <Header />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          width: "85%",
        }}
      >
        <Sidebar responsive={false} />
        <HomeScreen />
      </Box> */}
    </div>
  );
}

export default App;

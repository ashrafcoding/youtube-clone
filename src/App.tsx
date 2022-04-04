import { useEffect } from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import HomeScreen from "./screens/HomeScreen";
import SignIn from "./screens/SignIn";
import { RootState } from "./redux/store";
import WatchScreen from "./screens/WatchScreen";
import SearchScreen from "./screens/SearchScreen";
import SubscriptionScreen from "./screens/SubscriptionScreen";
import ExploreScreen from "./screens/ExploreScreen";
import LibraryScreen from "./screens/LibraryScreen";
import LikedScreen from "./screens/LikedScreen";

function Layout({ children, watch=false }: { children: JSX.Element, watch?: boolean }) {
  return (
    <>
      <Header />
      <Grid
        container
        spacing={2}
        sx={{
          height: "100vh",
          px: 2,
        }}
      >
        {watch ? <Grid item xs={12} >
          {children}
          </Grid> :(<>
        <Grid item xs={1} lg={2}>
          <Sidebar responsive={false} />
        </Grid>
        <Grid item xs={11} lg={10}>
          {children}
        </Grid> </>)}
      </Grid>
    </>
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
      <Route
        path="/"
        element={<Layout children={<HomeScreen show={true} />} />}
      />
      <Route path="/signin" element={<SignIn />} />
      <Route
        path="/watch/:id"
        element={<Layout watch={true} children={<WatchScreen />} />}
      />
      <Route
        path="/search/:query"
        element={<Layout children={<SearchScreen />} />}
      />
      <Route
        path="/subscriptions"
        element={<Layout children={<SubscriptionScreen />} />}
      />
      <Route
        path="/explore"
        element={<Layout children={<ExploreScreen />} />}
      />
      <Route
        path="/library"
        element={<Layout children={<LibraryScreen />} />}
      />
      <Route
        path="/liked%20videos" 
        element={<Layout children={<LikedScreen />} />}
      />
       <Route
        path="/history" 
        element={<Layout children={<LikedScreen />} />}
      />
    </Routes>
  );
}

export default App;

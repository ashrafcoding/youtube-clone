import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Grid } from "@mui/material";
import CategoriesBar from "../components/CategoriesBar";
import Video from "../components/Video";
import {
  getPopularVideos,
  getVideosByCategory,
} from "../redux/actions/videoAction";
import { RootState } from "../redux/store";
import InfiniteScroll from "react-infinite-scroll-component";

function HomeScreen({ show }: { show: boolean }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularVideos());
  }, [dispatch]);

  const { homeVideos, activeCategory } = useSelector(
    (state: RootState) => state.videos
  );
  const fetchData = () => {
    activeCategory === "All"
      ? dispatch(getPopularVideos())
      : dispatch(getVideosByCategory(activeCategory));
  };

  return (
    <Container>
      {show && <CategoriesBar />}
      <Box sx={{ flexGrow: 1 }}>
        <InfiniteScroll
          dataLength={homeVideos.length}
          next={fetchData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          <Grid container spacing={2}>
            {homeVideos.map((video) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={video["id"]}>
                  <Video video={video} />
                </Grid>
              );
            })}
          </Grid>
        </InfiniteScroll>
      </Box>
    </Container>
  );
}

export default HomeScreen;

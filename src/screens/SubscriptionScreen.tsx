import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSubscriptionChannels } from "../redux/actions/videoAction";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Video from "../components/Video";
import { Grid } from "@mui/material";
type Movie = RootState["videos"]["homeVideos"][number];
type Channel = RootState["subscriptionChannels"]["channels"][number];

const SubscriptionScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubscriptionChannels());
  }, [dispatch]);

  const { channels } = useSelector(
    (state: RootState) => state.subscriptionChannels
  );
  let movies: Movie[] = [];
  channels.forEach((channel: Channel) => {
    movies = movies.concat(...channel["playlist"]);
  });

  return (
    <>
      <Grid container spacing={2}>
        {movies.map((video) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={video["id"]}>
              <Video video={video} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default SubscriptionScreen;

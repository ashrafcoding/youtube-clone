import axios from "axios";
import { AppDispatch } from "./store";
import { homeVideosRequest, homeVideosSuccess, homeVideosFail } from "./sliceVideo";

export const getPopularVideos = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "snippet,contentDetails,statistics",
          chart: "mostPopular",
          maxResults: "20",
          regionCode: "US",
          pageToken: "",
          key: process.env.REACT_APP_YOUTUBE_API_KEY,
        },
      }
    );
    dispatch(homeVideosRequest())
    dispatch(homeVideosSuccess({ video: data.items, nextPageToken: data.nextPageToken }));
  } catch (error) {
      dispatch(homeVideosFail(error));
    console.log(error);
  }
};

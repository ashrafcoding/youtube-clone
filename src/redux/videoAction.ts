import axios from "axios";
import { AppDispatch, RootState } from "./store";
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
    dispatch(homeVideosSuccess({ video: data.items, nextPageToken: data.nextPageToken, search:"All" }));
  } catch (error) {
      dispatch(homeVideosFail(error));
    console.log(error);
  }
};

export const getVideosBySearch = (search: string) => async (dispatch: AppDispatch, getState:() => RootState) => {
  try {

    const { data } = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          maxResults: "20",
          q: search,
          pageToken: getState().videos.nextPageToken,
          type: "video",
          key: process.env.REACT_APP_YOUTUBE_API_KEY,
        },
      }
    );

    dispatch(homeVideosRequest())
    dispatch(homeVideosSuccess({ video: data.items, nextPageToken: data.nextPageToken, search }));
  } catch (error) {
      dispatch(homeVideosFail(error));
    console.log(error);
  }
}

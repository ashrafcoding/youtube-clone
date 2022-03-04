import axios from "axios";
import { AppDispatch, RootState } from "./store";
import { homeVideosRequest, homeVideosSuccess } from "./sliceVideo";

type Movie = RootState["videos"]["homeVideos"][number];

const getIcon = async (channelId: string) => {
  const {
    data: { items },
  } = await axios.get("https://www.googleapis.com/youtube/v3/channels", {
    params: {
      part: "snippet,statistics",
      id: channelId,
      key: process.env.REACT_APP_YOUTUBE_API_KEY2,
    },
  });
  const {
    snippet: {
      thumbnails: {
        default: { url: iconUrl },
      },
    },
  } = items[0];
  const { viewCount } = items[0].statistics;
  return { iconUrl, viewCount };
};

export const getPopularVideos =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const { data } = await axios.get(
        "https://www.googleapis.com/youtube/v3/videos",
        {
          params: {
            part: "snippet,contentDetails,statistics",
            chart: "mostPopular",
            maxResults: "4",
            regionCode: "US",
            pageToken: getState().videos.nextPageToken ,
            key: process.env.REACT_APP_YOUTUBE_API_KEY2,
          },
        }
      );

      const unresolved = data.items.map(async (item: Movie) => {
        let obj = {
          id: item["id"]["videoId"] || item["id"],
          url: item["snippet"]["thumbnails"]["medium"]["url"],
          title: item["snippet"]["title"],
          channelId: item["snippet"]["channelId"],
          channelTitle: item["snippet"]["channelTitle"],
          publishedAt: item["snippet"]["publishedAt"],
          etag: item["etag"],
        };
        const icon = await getIcon(item["snippet"]["channelId"]);
        return { ...obj, ...icon };
      });
      const movies = await Promise.all(unresolved);

      dispatch(homeVideosRequest());
      dispatch(
        homeVideosSuccess({
          video: movies,
          nextPageToken: data.nextPageToken,
          category: "All",
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

export const getVideosByCategory =
  (keyword: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const { data } = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            part: "snippet",
            maxResults: "4",
            pageToken: getState().videos.nextPageToken,
            q: keyword,
            type: "video",
            key: process.env.REACT_APP_YOUTUBE_API_KEY2,
            category: keyword,
          },
        }
      );

      const unresolved = data.items.map(async (item: Movie) => {
        let obj = {
          id: item["id"]["videoId"] || item["id"],
          url: item["snippet"]["thumbnails"]["medium"]["url"],
          title: item["snippet"]["title"],
          channelId: item["snippet"]["channelId"],
          channelTitle: item["snippet"]["channelTitle"],
          publishedAt: item["snippet"]["publishedAt"],
          etag: item["etag"],
        };
        const icon = await getIcon(item["snippet"]["channelId"]);
        return { ...obj, ...icon };
      });
      const movies = await Promise.all(unresolved);

      dispatch(homeVideosRequest());
      dispatch(
        homeVideosSuccess({
          video: movies,
          nextPageToken: data.nextPageToken,
          category: keyword,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

import { AppDispatch, RootState } from "../store";
import { homeVideosRequest, homeVideosSuccess } from "../slices/sliceVideo";
import {
  selectedVideoRequest,
  selectedVideoSuccess,
} from "../slices/sliceSelectedVideo";
import {
  searchedVideosRequest,
  searchedVideosSuccess,
} from "../slices/sliceSearchedVideo";
import {
  subscriptionChannelsRequest,
  subscriptionChannelsSuccess,
} from "../slices/sliceSubscriptionChannel";
import request from "../api";

type Movie = RootState["videos"]["homeVideos"][number];

const serialized = (item: Movie) => ({
  id: item["id"]["videoId"] || item["id"],
  url: item["snippet"]["thumbnails"]["medium"]["url"],
  title: item["snippet"]["title"],
  channelId: item["snippet"]["channelId"],
  channelTitle: item["snippet"]["channelTitle"],
  publishedAt: item["snippet"]["publishedAt"],
  etag: item["etag"],
  duration: item["contentDetails"] ? item["contentDetails"]["duration"] : "",
});

const getIcon = async (channelId: string) => {
  const {
    data: { items },
  } = await request.get("channels", {
    params: {
      part: "snippet,statistics",
      id: channelId,
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
      const { data } = await request.get("videos", {
        params: {
          part: "snippet,contentDetails,statistics",
          chart: "mostPopular",
          maxResults: "4",
          regionCode: "US",
          pageToken: getState().videos.nextPageToken,
        },
      });

      const unresolved = data.items.map(async (item: Movie) => {
        const serializedObj = serialized(item);
        const icon = await getIcon(item["snippet"]["channelId"]);
        return { ...serializedObj, ...icon };
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
      const { data } = await request.get("search", {
        params: {
          part: "snippet",
          maxResults: "4",
          pageToken: getState().videos.nextPageToken,
          q: keyword,
          type: "video",
          category: keyword,
        },
      });

      const unresolved = data.items.map(async (item: Movie) => {
        const serializedObj = serialized(item);
        const icon = await getIcon(item["snippet"]["channelId"]);
        return { ...serializedObj, ...icon };
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

export const getVideoById =
  (id: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const {
        data: { items },
      } = await request.get("videos", {
        params: {
          part: "snippet,contentDetails,statistics",
          id,
        },
      });
      const serializedObj = {
        id: items[0]["id"],
        title: items[0]["snippet"]["title"],
        channelId: items[0]["snippet"]["channelId"],
        channelTitle: items[0]["snippet"]["channelTitle"],
        publishedAt: items[0]["snippet"]["publishedAt"],
        etag: items[0]["etag"],
        duration: items[0]["contentDetails"]["duration"],
        viewCount: items[0]["statistics"]["viewCount"],
        likeCount: items[0]["statistics"]["likeCount"],
        dislikeCount: items[0]["statistics"]["dislikeCount"],
        favoriteCount: items[0]["statistics"]["favoriteCount"],
        commentCount: items[0]["statistics"]["commentCount"],
        iconUrl: items[0]["snippet"]["thumbnails"]["medium"]["url"],
        description: items[0]["snippet"]["description"],
        subscriper: items[0]["snippet"]["subscriberCount"],
      };

      dispatch(selectedVideoRequest());
      dispatch(
        selectedVideoSuccess({
          video: serializedObj,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

export const getRelatedVideos =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      const { data } = await request.get("search", {
        params: {
          part: "snippet",
          maxResults: "10",
          relatedToVideoId: id,
          type: "video",
        },
      });
      const filtered = data.items.filter(
        (item: { snippet: unknown }) => item.snippet
      );
      const unresolved = filtered.map(async (item: Movie) => {
        const serializedObj = serialized(item);
        const icon = await getIcon(item["snippet"]["channelId"]);
        return { ...serializedObj, ...icon };
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

export const getVideosBySearch =
  (keyword: string) => async (dispatch: AppDispatch) => {
    try {
      const { data } = await request.get("search", {
        params: {
          part: "snippet",
          maxResults: "4",
          q: keyword,
          type: "video, channel",
          category: keyword,
        },
      });

      const unresolved = data.items.map(async (item: Movie) => {
        const serializedObj = serialized(item);
        const icon = await getIcon(item["snippet"]["channelId"]);
        return { ...serializedObj, ...icon };
      });
      const movies = await Promise.all(unresolved);

      dispatch(searchedVideosRequest());
      dispatch(searchedVideosSuccess(movies));
    } catch (error) {
      console.log(error);
    }
  };

export const getSubscriptionChannels =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const { data } = await request.get("subscriptions", {
        params: {
          part: "snippet, contentDetails",
          mine: true,
          maxResults: "10",
        },
        headers: {
          Authorization: `Bearer ${getState().auth.accessToken}`,
        },
      });
      console.log(data.items);

      const unresolved = data.items.map(async (item: Movie) => {
        const serializedObj = serialized(item);
        const icon = await getIcon(item["snippet"]["channelId"]);
        return { ...serializedObj, ...icon };
      });
      const channels = await Promise.all(unresolved);

      dispatch(subscriptionChannelsRequest());
      dispatch(subscriptionChannelsSuccess(channels));
    } catch (error) {
      console.log(error);
    }
  };

import axios from "axios";
import { AppDispatch, RootState } from "../store";
import { channelRequest, channelSuccess } from "../slices/sliceChannel";
import { subscriptionSuccess } from "../slices/sliceSubscription";

export const getChannelDetail =
  (channelId: string) => async (dispatch: AppDispatch) => {
    try {
      const {
        data: { items },
      } = await axios.get("https://www.googleapis.com/youtube/v3/channels", {
        params: {
          part: "snippet,statistics,contentDetails",
          id: channelId,
          key: process.env.REACT_APP_YOUTUBE_API_KEY,
        },
      });
      const channel = {
        id: items[0]["id"],
        iconUrl: items[0]["snippet"]["thumbnails"]["default"]["url"],
        title: items[0]["snippet"]["title"],
        subscribers: items[0]["statistics"]["subscriberCount"],
        videos: items[0]["statistics"]["videoCount"],
        description: items[0]["snippet"]["description"],
        publishedAt: items[0]["snippet"]["publishedAt"],
      };

      dispatch(channelRequest());
      dispatch(channelSuccess(channel));
    } catch (error) {
      console.log(error);
    }
  };

export const subscriptionStatus =
  (channelId: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const {
        data: { items },
      } = await axios.get(
        "https://www.googleapis.com/youtube/v3/subscriptions",
        {
          params: {
            part: "snippet",
            forChannelId: channelId,
            mine: "true",
            key: process.env.REACT_APP_YOUTUBE_API_KEY,
          },
          headers: {
            Authorization: `Bearer ${getState().auth.accessToken}`,
          },
        }
      );
      dispatch(subscriptionSuccess(items.length !== 0));
    } catch (error) {
      console.log(error);
    }
  };

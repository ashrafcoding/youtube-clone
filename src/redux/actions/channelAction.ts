import { AppDispatch, RootState } from "../store";
import { channelRequest, channelSuccess } from "../slices/sliceChannel";
import { subscriptionSuccess } from "../slices/sliceSubscription";
import request from "../api";
// import {
//   subscriptionChannelsRequest, subscriptionChannelsSuccess} from "../slices/sliceSubscriptionChannel";

export const getChannelDetail =
  (channelId: string) => async (dispatch: AppDispatch) => {
    try {
      const {
        data: { items },
      } = await request.get("channels", {
        params: {
          part: "snippet,statistics,contentDetails",
          id: channelId,
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
      } = await request.get("subscriptions", {
        params: {
          part: "snippet",
          forChannelId: channelId,
          mine: "true",
          maxResults: "10",
        },
        headers: {
          Authorization: `Bearer ${getState().auth.accessToken}`,
        },
      });
      dispatch(subscriptionSuccess(items.length !== 0));
    } catch (error) {
      console.log(error);
    }
  };

import request from "../api";
import { AppDispatch, RootState } from "../store";
import { commentsRequest, commentsSuccess } from "../slices/sliceComments";

type Comment = RootState["commentList"]["comments"][number];

const serialized = (comment: any) => ({
  id: comment["id"],
  textDisplay: comment["snippet"]["topLevelComment"]["snippet"]["textDisplay"],
  publishedAt: comment["snippet"]["topLevelComment"]["snippet"]["publishedAt"],
  authorDisplayName:
    comment["snippet"]["topLevelComment"]["snippet"]["authorDisplayName"],
  authorProfileImageUrl:
    comment["snippet"]["topLevelComment"]["snippet"]["authorProfileImageUrl"],
});

export const getComments =
  (postId: string) => async (dispatch: AppDispatch) => {
    try {
      const {
        data: { items },
      } = await request.get("commentThreads", {
        params: {
          part: "snippet",
          videoId: postId,
        },
      });
      const comments = items.map((comment: Comment) => {
        return serialized(comment);
      });
      dispatch(commentsRequest());
      dispatch(commentsSuccess(comments));
    } catch (error) {
      console.log(error);
    }
  };

export const addComment =
  (id: string, comment: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const obj = {
        snippet: {
          channelId: id,
          topLevelComment: {
            snippet: {
              textOriginal: comment,
            },
          },
        },
      };
      const { data } = await request.post("commentThreads", obj, {
        params: {
          part: "snippet",
        },
        headers: {
          Authorization: `Bearer ${getState().auth.accessToken}`,
        },
      });
      const newComment = serialized(data);
      const comments = getState().commentList.comments;
      dispatch(commentsRequest());
      dispatch(commentsSuccess([newComment, ...comments]));
    } catch (error) {
      console.log(error);
    }
  };

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSubscriptionChannels } from "../redux/actions/videoAction";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import VideoHorizontal from "../components/VideoHorizontal";

const SubscriptionScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubscriptionChannels());
  }, [dispatch]);

  const { channels } = useSelector(
    (state: RootState) => state.subscriptionChannels
  );

  return (
    <>
      {channels.map((channel) => (
        <VideoHorizontal key={channel["id"]} video={channel} />
      ))}
    </>
  );
};

export default SubscriptionScreen;

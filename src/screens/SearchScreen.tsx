import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideosBySearch } from "../redux/actions/videoAction";
import { RootState } from "../redux/store";
import VideoHorizontal from "../components/VideoHorizontal";

const SearchScreen = () => {
  const { query } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    query && dispatch(getVideosBySearch(query));
  }, [dispatch, query]);
  const { videos } = useSelector((state: RootState) => state.searchedVideos);

  return (
    <>
      {videos.map((video) => (
        <VideoHorizontal key={video["id"]} video={video} />
      ))}
    </>
  );
};

export default SearchScreen;

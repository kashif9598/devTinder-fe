import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addFeed } from "../store/feedSlice";
import useFetch from "../hooks/useFetch";

const Feed = () => {
  const { data, error, loading } = useFetch("/feed");
  const dispatch = useDispatch();

  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      dispatch(addFeed(data));
    }
  }, [data, dispatch]);

  const feed = useSelector((state) => state.feed);

  if (loading) return <p>Loading......</p>;
  if (error) return <h1 className="text-2xl">{error}</h1>;
  if (!feed || feed.length === 0) {
    return <h1 className="flex justify-center my-5 text-3xl">All Caught Up for Today !!!!!</h1>;
  }

  return (
    <>
      <Card user={feed[0]} />
    </>
  );
};

export default Feed;

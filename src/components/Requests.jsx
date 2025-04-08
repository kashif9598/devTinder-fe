import { useDispatch, useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import { addRequests, removeRequest } from "../store/requestSlice";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Requests = () => {
  const { data, error, loading } = useFetch("/user/requests/received");
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      data &&
      Array.isArray(data.connectionRequests) &&
      data.connectionRequests.length > 0
    ) {
      dispatch(addRequests(data.connectionRequests));
    }
  }, [data, dispatch]);
  const requests = useSelector((state) => state.requests);

  const reviewRequest = async (status, id) => {
    try {
      await axios.post(
        BASE_URL + `/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(id));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading......</p>;
  if (error) return <h1 className="text-2xl">{error}</h1>;
  // if(requests.length < 1) return <h1 className="text-3xl">No New</h1>

  return (
    <div className="flex justify-center h-auto p-4">
      <div className="flex flex-col justify-center bg-gray-900 p-4 rounded-lg shadow-md w-3/4">
        <h1 className="text-3xl font-bold italic py-3">Connection Requests</h1>
        {requests.length > 0 ? (
          <>
            <div className="w-full space-y-4">
              {requests.map((request) => {
                const { _id, firstName, lastName, photoUrl, about } =
                  request.fromUserId;
                return (
                  <div
                    key={_id}
                    className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md"
                  >
                    <img
                      src={photoUrl}
                      alt="user-photo"
                      className="w-16 h-16 rounded-full object-cover border-2 border-indigo-400"
                    />
                    <div className="ml-4">
                      <span className="block text-lg font-semibold">
                        {firstName} {lastName}
                      </span>
                      <p className="text-sm">{about}</p>
                    </div>
                    <div className="ml-auto space-x-3">
                      <button
                        className="btn btn-primary"
                        onClick={() => reviewRequest("accepted", request._id)}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => reviewRequest("rejected", request._id)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <h1 className="my-5 flex text-2xl justify-center">No New Connection Requests</h1>
        )}
      </div>
    </div>
  );
};

export default Requests;

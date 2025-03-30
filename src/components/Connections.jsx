import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../store/connectionsSlice";
import useFetch from "../hooks/useFetch";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connections);
  const { data, error, loading } = useFetch("/user/connections");
  dispatch(addConnections(data));
  if (loading) return <p>Loading......</p>;
  if (error) return <h1 className="text-2xl">{error}</h1>;

  return (
    <div className="flex justify-center h-auto p-4">
      <div className="flex flex-col justify-center bg-gray-900 p-4 rounded-lg shadow-md w-1/2">
        <h1 className="text-2xl font-bold italic py-3">Connections</h1>
        <div className="w-full space-y-4">
          {connections.map((connection) => {
            const { _id, firstName, lastName, photoUrl, about } = connection;
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connections;

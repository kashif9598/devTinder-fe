import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { updateFeed } from "../store/feedSlice";
import { useLocation } from "react-router-dom";

const Card = ({ user }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { _id, firstName, lastName, photoUrl, about, age, gender, skills } =
    user;

  const reviewRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + `/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(updateFeed(userId));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center my-20">
      <div className="card bg-[#602325] w-96 shadow-xl">
        <figure>
          <img src={photoUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
          <p>
            {age}, {gender}
          </p>
          <p>{about}</p>
          <div className="flex items-center">
            <span className="font-bold">Skills:</span>
            {skills && (
              <div className="flex flex-wrap gap-2 mx-3">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="badge badge-accent cursor-pointer"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            )}
          </div>
          {location.pathname !== "/profile" && (
            <div className="card-actions justify-center my-5">
              <button
                className="btn btn-primary"
                onClick={() => reviewRequest("ignored", _id)}
              >
                Ignore
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => reviewRequest("interested", _id)}
              >
                Interested
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;

import { useState } from "react";
import Card from "./Card";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [age, setAge] = useState(user.age);
  const [skills, setSkills] = useState(user.skills);
  const [gender, setGender] = useState(user.gender);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleSaveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          about,
          age,
          gender,
        },
        { withCredentials: true }
      );
      console.log(res);
      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      setError(null)
    } catch (error) {
      console.error(error);
      setError(error?.response?.data)
    }
  };
  return (
    <>
      <div className="flex justify-center item">
        <div className="flex justify-center item my-20 mr-20">
          <div className="card bg-[#bb6d6d] w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-[#271313] justify-center">
                Edit Profile
              </h2>
              <label className="input input-bordered flex items-center gap-2">
                First Name
                <input
                  type="text"
                  className="grow"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Last Name
                <input
                  type="text"
                  className="grow"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Age
                <input
                  type="number"
                  className="grow"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Gender
                <input
                  type="text"
                  className="grow"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Photo URL
                <input
                  type="text"
                  className="grow"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>
              {/* <label className="input input-bordered flex items-center gap-2">
                About
                <input
                  type="text"
                  className="grow"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label> */}
              <textarea
                className="textarea textarea-bordered"
                placeholder="About"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                type="text"
              ></textarea>
              {/* TODO: Add skills input, skills should go in array format */}
              {/* <label className="input input-bordered flex items-center gap-2">
              Skills
              <input
                type="text"
                className="grow"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </label> */}
              {error && <p className="text-red-800 font-bold text-xl">{error}</p>}
              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={handleSaveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <Card user={{ firstName, lastName, age, gender, photoUrl, about }} />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;

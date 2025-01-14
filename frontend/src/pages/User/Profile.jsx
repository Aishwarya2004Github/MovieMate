import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../component/Loader";
import { useProfileMutation } from "../../redux/api/users";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Redirect to login if user is not logged in
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");  // Or show a message prompting the user to log in
    }
  }, [userInfo, navigate]);

  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setUsername(userInfo.username);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else if (!username || !email || !password) {
      toast.error("All fields are required");
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        console.error("Error details:", err);
        toast.error(err?.data?.message || err?.error || "An error occurred");
      }
    }
  };

  return (
    <div className="container mx-auto p-4 mt-[2rem] bg-gradient-to-r from-gray-900 via-gray-800 to-black min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg p-8 bg-gradient-to-r from-purple-600 via-gray-900 to-black rounded-lg shadow-xl text-white">
        <h2 className="text-3xl font-semibold text-center text-teal-400 mb-6 glow-text">
          Update Your Profile 🎬
        </h2>

        <form onSubmit={submitHandler}>
          <div className="mb-5">
            <label className="block text-gray-300 mb-2">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              autoComplete="off"
              className="form-input p-4 rounded-lg w-full border border-gray-700 focus:ring-2 focus:ring-teal-400 bg-gray-800 text-white hover:ring-teal-500 transition-all"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              placeholder="Enter email"
              autoComplete="off"
              className="form-input p-4 rounded-lg w-full border border-gray-700 focus:ring-2 focus:ring-teal-400 bg-gray-800 text-white hover:ring-teal-500 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              autoComplete="off"
              className="form-input p-4 rounded-lg w-full border border-gray-700 focus:ring-2 focus:ring-teal-400 bg-gray-800 text-white hover:ring-teal-500 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-300 mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              autoComplete="off"
              className="form-input p-4 rounded-lg w-full border border-gray-700 focus:ring-2 focus:ring-teal-400 bg-gray-800 text-white hover:ring-teal-500 transition-all"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-teal-500 w-full mt-4 font-bold text-white py-3 px-6 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
              disabled={loadingUpdateProfile}
            >
              {loadingUpdateProfile ? "Updating..." : "Update"}
            </button>

            {loadingUpdateProfile && (
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                <Loader />
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;

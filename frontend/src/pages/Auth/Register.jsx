import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useRegisterMutation } from "../../redux/api/users";
import { toast } from "react-toastify";
import WelcomeSound from "../../assets/relaxing-145038.mp3";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered.");
      } catch (err) {
        console.log(err);
        toast.error(err.data.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black via-dark-gray to-dark-blue">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl bg-opacity-80 bg-black rounded-lg shadow-lg">
        {/* Left Section (Form) */}
        <div className="w-full lg:w-1/2 p-8 text-white">
          <h1 className="text-4xl font-extrabold text-teal-400 mb-6 text-center tracking-wider text-shadow-lg">Register</h1>

          <form onSubmit={submitHandler} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-2 p-4 border border-gray-300 rounded-lg w-full bg-transparent text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500 transition-all"
                placeholder="Enter Name"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-2 p-4 border border-gray-300 rounded-lg w-full bg-transparent text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500 transition-all"
                placeholder="Enter Email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-2 p-4 border border-gray-300 rounded-lg w-full bg-transparent text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500 transition-all"
                placeholder="Enter Password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="mt-2 p-4 border border-gray-300 rounded-lg w-full bg-transparent text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500 transition-all"
                placeholder="Confirm Password"
                autoComplete="off"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                disabled={isLoading}
                type="submit"
                className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 disabled:bg-teal-400 transition-all"
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
              {isLoading && <Loader />}
               <audio src={WelcomeSound} autoPlay={true} />
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-4 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="text-teal-500 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* Right Section (Image) */}
        <div className="hidden lg:block w-1/2 h-full relative">
          <img
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Cinematic Background"
            className="object-cover w-full h-full rounded-r-lg opacity-80"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
      </div>
    </div>
  );
};

export default Register;

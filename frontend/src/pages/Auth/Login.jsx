import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../redux/api/users";
import { toast } from "react-toastify";
import WelcomeSound from "../../assets/relaxing-145038.mp3";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

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
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-gray-900 to-black">
      {/* Heading */}
      <div className="bg-black bg-opacity-60 w-full flex justify-center items-center p-4 absolute top-0">
        <h2 className="text-2xl text-teal-400 font-bold">Welcome to MovieMate: Your Ultimate Destination for Honest Film Reviews</h2>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center w-full h-full pt-16">
        <div className="w-full max-w-lg bg-opacity-80 bg-gradient-to-tl from-black to-gray-800 rounded-lg shadow-lg overflow-hidden">
          <section className="flex flex-col lg:flex-row">
            {/* Left Section - Form */}
            <div className="lg:w-2/3 w-full p-8">
              <h1 className="mt-36 text-4xl font-extrabold text-teal-400 mb-6">Sign In</h1>
              <form onSubmit={submitHandler} className="space-y-6">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-200">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="mt-2 p-3 border border-gray-600 rounded-lg w-full focus:ring-2 focus:ring-teal-400 bg-black text-white placeholder-gray-400"
                    placeholder="Enter Email"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-200">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="mt-2 p-3 border border-gray-600 rounded-lg w-full focus:ring-2 focus:ring-teal-400 bg-black text-white placeholder-gray-400"
                    placeholder="Enter Password"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {/* Submit Button */}
                <div>
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="w-full py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 disabled:bg-teal-400"
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </button>
                  {isLoading && <Loader />}
                  <audio src={WelcomeSound} autoPlay={true} />
                </div>
              </form>
              {/* Register Link */}
              <div className="mt-4 text-center">
                <p className="text-gray-300">
                  New Customer?{" "}
                  <Link
                    to={redirect ? `/register?redirect=${redirect}` : "/register"}
                    className="text-teal-400 hover:underline"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </div>
            {/* Right Section - Movie Background Image */}
            <div
              className="hidden lg:block lg:w-1/2 bg-cover bg-center"
              style={{
                backgroundImage:
                  'url("https://images.pexels.com/photos/8261819/pexels-photo-8261819.jpeg?auto=compress&cs=tinysrgb&w=600")',
              }}
            ></div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Login;

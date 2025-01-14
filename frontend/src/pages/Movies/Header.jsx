import SliderUtil from "../../component/SliderUtil";
import { useGetNewMoviesQuery } from "../../redux/api/movies";
import { Link } from "react-router-dom";

const Header = () => {
  const { data } = useGetNewMoviesQuery();

  return (
    <div className="flex flex-col md:flex-row justify-between items-center md:items-start mt-8 mx-4 gap-6">
      {/* Navigation Section */}
      <nav className="w-full md:w-[12rem] bg-gray-800 shadow-lg p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-6">🎬 Movie Mate</h2>
        <div className="mb-6">
          <img 
            src="/m.png" // Assuming m.png is in the public folder
            alt="Logo" 
            className="w-full h-auto rounded-lg"
          />
        </div>
        <ul className="text-lg font-medium">
          <li className="mb-4">
            <Link
              to="/"
              className="block p-3 rounded-lg bg-teal-600 text-white text-center hover:bg-teal-400 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/movies"
              className="block p-3 rounded-lg bg-teal-600 text-white text-center hover:bg-teal-400 transition duration-300"
            >
              Browse Movies
            </Link>
          </li>
        </ul>
      </nav>

      {/* Slider Section */}
      <div className="w-full md:w-[75%] bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg rounded-lg overflow-hidden relative">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <h2 className="text-2xl font-bold text-white z-10 relative p-4">🍿 Latest Movies🎬</h2>
        <SliderUtil data={data} />
      </div>
    </div>
  );
};

export default Header;

import Header from "./Movies/Header";
import MoviesContainerPage from "./Movies/MoviesContainerPage";
import image from "../assets/l.png";
import image2 from "../assets/lright.png";

const Home = () => {
  return (
    <>
      {/* Header Section */}
      <Header />

      {/* Movies Section */}
      <section className="mt-[8rem] flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center text-teal-400">
          Explore Your Favorite Movies 🎥
        </h1>
        <p className="text-lg md:text-xl text-gray-300 text-center max-w-2xl mb-12">
          Dive into the world of cinema with our curated collection of the latest and greatest movies. Click to explore and learn more about each film!
        </p>
        <MoviesContainerPage />
      </section>

      {/* Footer Section */}
      <footer className="w-full bg-gradient-to-r from-gray-800 via-black to-gray-900 text-white py-6">
        <div className="flex flex-col md:flex-row items-center justify-between px-8 gap-6">
          {/* Decorative Images */}
          <img src={image2} alt="Left Decorative" className="w-[100px] h-auto md:w-[150px]" />
          {/* Copyright Text */}
          <p className="text-center text-sm md:text-base">
            &copy; {new Date().getFullYear()} <span className="font-bold text-teal-400">Your Sarya ❤️</span>. All rights reserved.
          </p>
          {/* Decorative Images */}
          <img src={image} alt="Right Decorative" className="w-[100px] h-auto md:w-[150px]" />
        </div>
      </footer>
    </>
  );
};

export default Home;

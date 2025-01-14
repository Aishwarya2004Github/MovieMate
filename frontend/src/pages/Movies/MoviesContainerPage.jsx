import { useState } from "react";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import SliderUtil from "../../component/SliderUtil";

const MoviesContainerPage = () => {
  const { data } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  const filteredMovies = data?.filter(
    (movie) => selectedGenre === null || movie.genre === selectedGenre
  );

  return (
    <section className="flex flex-col justify-center items-center w-full lg:w-auto lg:ml-8 space-y-8">
      {/* Random Movies Section */}
      <div className="w-full lg:w-[80rem] shadow-md rounded-lg p-6" style={{ backgroundColor: '#81cdc6' }}>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Choose For You</h1>
        <SliderUtil data={randomMovies} />
      </div>

      {/* Top Movies Section */}
      <div className="w-full lg:w-[80rem] shadow-md rounded-lg p-6" style={{ backgroundColor: '#81cdc6' }}>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Top Movies</h1>
        <SliderUtil data={topMovies} />
      </div>

      {/* Filtered Movies Section */}
      <div
  className="w-full lg:w-[80rem] shadow-2xl rounded-lg p-8"
  style={{
    background: "linear-gradient(135deg, #141e30, #243b55)",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
  }}
>
  <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 mb-10 text-center">
    Choose Your Movie 🎥
  </h1>
  <div className="flex justify-center w-full mt-8">
  <nav className="bg-gradient-to-r from-indigo-900 via-purple-900 to-black shadow-2xl rounded-lg p-6 w-full max-w-xs flex flex-row space-x-4 overflow-x-auto">
  {genres?.map((g) => (
    <button
      key={g._id}
      className={`transition-all duration-500 ease-in-out block px-4 py-3 rounded-lg text-lg font-semibold shadow-md hover:shadow-2xl hover:scale-105 transform text-center ${
        selectedGenre === g._id
          ? "bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white shadow-lg"
          : "bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 text-gray-200 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-red-500 hover:text-white"
      }`}
      onClick={() => handleGenreClick(g._id)}
    >
      {g.name}
    </button>
  ))}
</nav>

</div>

  <div className="mt-10">
    <SliderUtil data={filteredMovies} />
  </div>
</div>

      {/* Sidebar for Genres (Moved to bottom) */}
      
    </section>
  );
};

export default MoviesContainerPage;
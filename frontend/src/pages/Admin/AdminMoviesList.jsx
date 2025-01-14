import { Link } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../redux/api/movies";

const AdminMoviesList = () => {
  const { data: movies } = useGetAllMoviesQuery();

  return (
    <div className="container mx-auto px-4 overflow-x-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="p-3">
          <div className="ml-[2rem] text-xl font-bold h-12 mb-6">
            All Movies ({movies?.length})
          </div>

          <div className="flex flex-wrap justify-start items-center gap-8">
            {movies?.map((movie) => (
              <Link
                key={movie._id}
                to={`/admin/movies/update/${movie._id}`}
                className="block mb-6 sm:mb-8 md:mb-10 w-full sm:w-[45%] md:w-[30%] lg:w-[22%] xl:w-[18%] p-4"
              >
                <div className="flex flex-col rounded overflow-hidden shadow-lg bg-gray-800 hover:shadow-xl transition duration-300">
                  <img
                    src={movie.image}
                    alt={movie.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl text-teal-400 mb-2">
                      {movie.name}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {movie.detail}
                    </p>
                  </div>

                  <div className="px-6 py-4 mt-auto">
                    <Link
                      to={`/admin/movies/update/${movie._id}`}
                      className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                    >
                      Update Movie
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMoviesList;

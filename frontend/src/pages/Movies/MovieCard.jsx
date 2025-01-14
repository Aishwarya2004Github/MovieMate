import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div
      key={movie._id}
      className="relative group m-[2rem] bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
    >
      <Link to={`/movies/${movie._id}`}>
        <img
          src={movie.image}
          alt={movie.name}
          className="w-full h-[20rem] object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>
      
      <p className="absolute bottom-[1rem] left-[1rem] text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {movie.name}
      </p>
    </div>
  );
};

export default MovieCard;

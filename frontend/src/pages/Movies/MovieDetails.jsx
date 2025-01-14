import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation,
} from "../../redux/api/movies";
import MovieTabs from "./MovieTabs";

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission status
  const { data: movie, refetch, isLoading: loadingMovie } = useGetSpecificMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingMovieReview }] = useAddMovieReviewMutation();

  // Fetch the user's stored rating for this movie from localStorage
  useEffect(() => {
    const storedRating = localStorage.getItem(`movieRating-${movieId}`);
    if (storedRating) {
      setRating(Number(storedRating));
    }
  }, [movieId]);

  // Handle review submission
  const submitHandler = async (e) => {
    e.preventDefault();

    // Prevent submission if no rating or comment
    if (rating === 0 || !comment.trim()) {
      toast.error("Please provide both rating and comment.");
      return;
    }

    try {
      // Add the review using mutation
      await createReview({
        id: movieId,
        rating,
        comment,
      }).unwrap();

      setIsSubmitted(true); // Mark as submitted
      refetch(); // Refetch movie data to update reviews
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error.data || error.message);
    }
  };

  const getReviewQuality = (rating) => {
    if (rating === 5 || rating === 4 ) return "Good";      // 5 is Good
    if (rating === 3) return "Average";   // 4 is Average
    if (rating <= 2) return "Bad";        // 0-3 is Bad
    return "Unknown";                     // Any other invalid rating
  };

  // Calculate the average rating excluding the user's rating before submission
  const totalRatings = movie?.reviews?.length || 0;
  const totalReviewsSum = movie?.reviews?.reduce((sum, review) => sum + review.rating, 0) || 0;

  // Exclude user's current rating from the sum until review is submitted
  const finalSum = isSubmitted ? totalReviewsSum + rating : totalReviewsSum;
  const finalRatingsCount = isSubmitted ? totalRatings + 1 : totalRatings;

  // Calculate average rating
  const averageRating = finalRatingsCount > 0
    ? parseFloat((finalSum / finalRatingsCount).toFixed(1))
    : 0;

  // Handle rating changes
  const handleRatingChange = (star) => {
    if (!isSubmitted) { // Only allow change if not submitted
      setRating(star);
      localStorage.setItem(`movieRating-${movieId}`, star);
    }
  };

  const reviewCounts = {
    good: 0,
    average: 0,
    bad: 0,
  };

  movie?.reviews?.forEach((review) => {
    const reviewQuality = getReviewQuality(review.rating);

    if (reviewQuality === "Good") {
      reviewCounts.good++;
    } else if (reviewQuality === "Average") {
      reviewCounts.average++;
    } else if (reviewQuality === "Bad") {
      reviewCounts.bad++;
    }
  });

  if (loadingMovie) {
    return <div className="text-center text-white">Loading movie details...</div>;
  }

  return (
    <>
      <div className="my-4">
        <Link to="/" className="text-teal-500 font-semibold hover:underline ml-[2rem] sm:ml-[5rem]">
          &larr; Go Back
        </Link>
      </div>

      <div className="mt-[2rem] bg-gray-900 text-white rounded-lg p-8 shadow-lg overflow-x-hidden">
        <div className="flex justify-center items-center mb-8">
          <img
            src={movie?.image}
            alt={movie?.name}
            className="w-[80%] sm:w-[50%] md:w-[40%] lg:w-[30%] rounded-lg shadow-md transition duration-300 transform hover:scale-105"
          />
        </div>

        <div className="flex flex-col lg:flex-row justify-between mx-[1rem] lg:mx-[5rem] gap-8">
          <section className="w-full lg:w-[60%]">
            <h2 className="text-3xl sm:text-4xl font-bold text-teal-400 mb-4">
              {movie?.name}
            </h2>
            <p className="mb-6 text-gray-300 leading-relaxed">
              {movie?.detail}
            </p>
          </section>

          <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full lg:w-[30%]">
            <p className="text-xl font-semibold mb-4">
              <span className="text-teal-400">🎥 Releasing Date:</span> {movie?.year}
            </p>
            <div>
              <h3 className="text-lg font-bold text-teal-400 mb-2">Cast:</h3>
              {movie?.cast?.map((c, index) => (
                <ul key={index} className="text-gray-300">
                  <li className="mt-[0.5rem]">- {c}</li>
                </ul>
              ))}
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-bold text-teal-400 mb-2">Rating:</h3>
              <p className="text-gray-300">
                Average Rating: <span className="font-semibold">{averageRating}</span>
              </p>
              <p className="text-gray-300">
                Total Ratings: <span className="font-semibold">{totalRatings}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
  <div className="flex items-center space-x-40">
    {/* Review Counts Section */}
    <div className="text-center text-gray-300 mb-3">
      <p className="text-green-600"><strong>Good Reviews:</strong> {reviewCounts.good}</p>
      <p className="text-orange-700"><strong>Average Reviews:</strong> {reviewCounts.average}</p>
      <p className="text-red-700"><strong>Bad Reviews:</strong> {reviewCounts.bad}</p>
    </div>

    {/* Rating Section */}
    <div className="text-center">
      <h3 className="text-lg font-bold text-teal-400 mb-2">Rate the Movie:</h3>
      <div className="flex items-center space-x-2 justify-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <label key={star} className="cursor-pointer">
            <input
              type="radio"
              name="rating"
              value={star}
              checked={rating === star}
              onChange={() => handleRatingChange(star)}
              className="hidden"
              disabled={isSubmitted} // Disable input after submission
            />
            <span
              className={`text-2xl ${rating >= star ? "text-yellow-400" : "text-gray-400"}`}
            >
              ★
            </span>
          </label>
        ))}
      </div>
    </div>
  </div>
</div>


        {rating > 0 && (
          <div className="mt-6 flex justify-center">
            <div className="text-center">
              <h3 className="text-lg font-bold text-teal-400 mb-2">Your Review Quality:</h3>
              <p className="text-gray-300">
                Your review is:{" "}
                <span className="font-semibold">{getReviewQuality(rating)}</span>
              </p>
              <p className="text-red-700">
                * It's advisable not to change the star rating after submitting your review as it will not affect the average rating.
              </p>
            </div>
          </div>
        )}



        <div className="container mx-[1rem] lg:mx-[5rem] mt-[4rem]">
          <MovieTabs
            loadingMovieReview={loadingMovieReview}
            userInfo={userInfo}
            submitHandler={submitHandler}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            movie={movie}
          />
        </div>
      </div>
    </>
  );
};

export default MovieDetails;

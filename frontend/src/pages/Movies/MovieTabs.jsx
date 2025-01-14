import { Link } from "react-router-dom";
import { useState } from "react";
import EmojiPicker from 'emoji-picker-react'; // Correct import

const MovieTabs = ({ userInfo, submitHandler, comment, setComment, movie }) => {
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const handleEmojiClick = (emojiData) => {
    setComment((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Review Form Section */}
      <section className="mb-8" style={{ marginRight: "70px", maxWidth: "1300px" }}>
        {userInfo ? (
          <form onSubmit={submitHandler} className="bg-[#2D2D2D] p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl text-white font-semibold mb-4">Write Your Review</h3>
            <div className="my-4">
              <label htmlFor="comment" className="block text-lg text-white mb-2">
                Your Review
              </label>
              <div className="relative">
                <textarea
                  id="comment"
                  rows="4"
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-600 transition duration-300"
                ></textarea>

                {/* Emoji Picker Button */}
                <button
                  type="button"
                  onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                  className="absolute top-2 right-2 text-gray-400"
                >
                  😊
                </button>

                {/* Emoji Picker */}
                {isEmojiPickerOpen && (
                  <div className="absolute bottom-32 right-0 z-50">
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-4 bg-teal-600 text-white rounded-lg hover:bg-teal-500 transition duration-300"
            >
              Submit Review
            </button>
          </form>
        ) : (
          <p className="text-center text-white mt-4">
            Please <Link to="/login" className="text-teal-600 hover:underline">Sign In</Link> to write a review.
          </p>
        )}
      </section>

      {/* Reviews Section */}
      <section style={{ marginLeft: "10px", maxWidth: "1000px", margin: "0 auto" }}>
        <h3 className="text-2xl text-white font-semibold mb-4 mt-8">User Reviews</h3>
        {movie?.reviews.length === 0 ? (
          <p className="text-white">No reviews yet. Be the first to review!</p>
        ) : (
          <div className="space-y-6">
            {movie?.reviews.map((review) => (
              <div
                key={review._id}
                className="bg-[#1A1A1A] p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="flex justify-between items-center mb-3">
                  <strong className="text-teal-400">{review.name}
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`text-xl ${review.rating >= star ? "text-yellow-400" : "text-gray-400"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </strong>
                  <p className="text-gray-500 text-sm">{review.createdAt.substring(0, 10)}</p>
                </div>

                <p className="text-gray-200">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MovieTabs;

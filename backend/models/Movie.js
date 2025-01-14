import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 }, // Ensure rating is between 1-5
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const movieSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    year: { type: Number, required: true },
    genre: { type: ObjectId, ref: "Genre", required: true },
    detail: { type: String, required: true },
    cast: [{ type: String }],
    reviews: [reviewSchema],
    numReviews: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 }, // Average rating field
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Pre-save hook to calculate the average rating whenever a review is added or updated
movieSchema.pre("save", function (next) {
  if (this.reviews.length > 0) {
    this.rating =
      this.reviews.reduce((acc, item) => item.rating + acc, 0) /
      this.reviews.length;
  } else {
    this.rating = 0; // Default rating when no reviews
  }
  next();
});

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;

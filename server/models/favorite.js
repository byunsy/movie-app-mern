// Setup necessary variables and requirements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a schema for users
const favoriteSchema = mongoose.Schema(
  {
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    movieId: {
      type: String,
    },
    movieTitle: {
      type: String,
    },
    moviePoster: {
      type: String,
    },
    movieRuntime: {
      type: String,
    },
    movieGenre: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = { Favorite };

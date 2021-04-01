const express = require("express");
const router = express.Router();
const { Favorite } = require("../models/favorite");

// ========================================================================= //
// FAVORITE ROUTES
// ========================================================================= //

router.post("/favoritecount", (req, res) => {
  // Get the number of favoritecounts from database
  Favorite.find({ movieId: req.body.movieId }).exec((err, subscribe) => {
    if (err) {
      return res.status(400).send(err);
    }
    // if found, send the info to the front
    res.status(200).json({
      success: true,
      favoritecount: subscribe.length,
    });
  });
});

// Determine whether the user have liked/favorited the movie
// Returns a boolean value
router.post("/favorited", (req, res) => {
  Favorite.find({ movieId: req.body.movieId, userFrom: req.body.userFrom }).exec(
    (err, subscribe) => {
      if (err) {
        return res.status(400).send(err);
      }

      let result = false;
      if (subscribe.length > 0) {
        result = true;
      }

      res.status(200).json({
        success: true,
        favorited: result,
      });
    }
  );
});

// Add to favorite movie list
router.post("/addToFavorite", (req, res) => {
  const favorite = new Favorite(req.body);

  favorite.save((err, doc) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.status(200).json({ success: true });
  });
});

// Remove from favorite movie list
router.post("/removeFromFavorite", (req, res) => {
  Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom }).exec(
    (err, doc) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      res.status(200).json({ success: true, doc });
    }
  );
});

router.post("/getFavoriteMovies", (req, res) => {
  Favorite.find({ userFrom: req.body.userFrom }).exec((err, favorites) => {
    if (err) {
      return res.status(400).send(err);
    }
    return res.status(200).json({ success: true, favorites });
  });
});

module.exports = router;

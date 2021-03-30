import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Button } from "antd";

function Favorite(props) {
  const userFrom = props.userFrom;
  const movieId = props.movieId;
  const movieTitle = props.movieInfo.title;
  const moviePoster = props.movieInfo.backdrop_path;
  const movieRuntime = props.movieInfo.runtime;

  const [FavoriteCount, setFavoriteCount] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  // Information about who liked what movies
  let variables = {
    userFrom: userFrom,
    movieId: movieId,
    movieTitle: movieTitle,
    moviePoster: moviePoster,
    movieRuntime: movieRuntime,
  };

  useEffect(() => {
    Axios.post("/api/favorite/favoritecount", variables).then((response) => {
      if (response.data.success) {
        setFavoriteCount(response.data.favoritecount);
      } else {
        alert("Error: Could not retrieve favoritecount.");
      }
    });

    Axios.post("/api/favorite/favorited", variables).then((response) => {
      if (response.data.success) {
        setFavorited(response.data.favorited);
      } else {
        alert("Error: Could not retrieve favorited.");
      }
    });
  }, []);

  const onClickFavorite = () => {
    if (Favorited) {
      Axios.post("/api/favorite/removeFromFavorite", variables).then((response) => {
        if (response.data.success) {
          setFavoriteCount(FavoriteCount - 1);
          setFavorited(!Favorited);
        } else {
          alert("Error: Failed to remove from favorite.");
        }
      });
    } else {
      Axios.post("/api/favorite/addToFavorite", variables).then((response) => {
        if (response.data.success) {
          setFavoriteCount(FavoriteCount + 1);
          setFavorited(!Favorited);
        } else {
          alert("Error: Failed to add to favorite.");
        }
      });
    }
  };

  return (
    <div>
      <Button onClick={onClickFavorite}>
        {Favorited ? "Remove from Favorite" : "Add to Favorite"} {FavoriteCount}
      </Button>
    </div>
  );
}

export default Favorite;

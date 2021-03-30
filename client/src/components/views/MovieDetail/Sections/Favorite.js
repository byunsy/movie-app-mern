import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Button } from "antd";
import { useSelector } from "react-redux";

function Favorite(props) {
  const user = useSelector((state) => state.user);

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

  const onClickFavorite = () => {
    if (user.userData && !user.userData.isAuth) {
      return alert("Please Log in first");
    }

    if (Favorited) {
      Axios.post("/api/favorite/removeFromFavorite", variables).then((response) => {
        if (response.data.success) {
          console.log(response.data);
          setFavoriteCount(FavoriteCount - 1);
          setFavorited(!Favorited);
        } else {
          alert("Error: Failed to remove from favorite.");
        }
      });
    } else {
      Axios.post("/api/favorite/addToFavorite", variables).then((response) => {
        if (response.data.success) {
          console.log(response.data);
          setFavoriteCount(FavoriteCount + 1);
          setFavorited(!Favorited);
        } else {
          alert("Error: Failed to add to favorite.");
        }
      });
    }
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
        console.log(response.data);
        setFavorited(response.data.favorited);
      } else {
        alert("Error: Could not retrieve favorited.");
      }
    });
  }, []);

  return (
    <div>
      <Button onClick={onClickFavorite}>
        {Favorited ? "Remove from Favorite" : "Add to Favorite"} {FavoriteCount}
      </Button>
    </div>
  );
}

export default Favorite;

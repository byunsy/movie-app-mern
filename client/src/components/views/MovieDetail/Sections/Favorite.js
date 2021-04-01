import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Button, message } from "antd";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

function Favorite(props) {
  const user = useSelector((state) => state.user);

  const userFrom = props.userFrom;
  const movieId = props.movieId;
  const movieTitle = props.movieInfo.title;
  const moviePoster = props.movieInfo.poster_path;
  const movieRuntime = props.movieInfo.runtime;
  const movieGenre = props.movieInfo.genres;

  const [FavoriteCount, setFavoriteCount] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  // Information about who liked what movies
  let variables = {
    userFrom: userFrom,
    movieId: movieId,
    movieTitle: movieTitle,
    moviePoster: moviePoster,
    movieRuntime: movieRuntime,
    movieGenre: movieGenre,
  };

  const onClickFavorite = () => {
    if (user.userData && !user.userData.isAuth) {
      message.warning({
        content: "Please sign in to your account to add this movie to your favorite list.",
        style: { marginTop: "10vh" },
      });
      props.history.push("/login");
      return;
    }

    if (Favorited) {
      Axios.post("/api/favorite/removeFromFavorite", variables).then((response) => {
        if (response.data.success) {
          setFavoriteCount(FavoriteCount - 1);
          setFavorited(!Favorited);
        } else {
          console.log("Failed Response", response.data);
          alert("Error: Failed to remove from favorite.");
        }
      });
    } else {
      Axios.post("/api/favorite/addToFavorite", variables).then((response) => {
        if (response.data.success) {
          setFavoriteCount(FavoriteCount + 1);
          setFavorited(!Favorited);
        } else {
          console.log("Failed Response", response.data);
          alert("Error: Failed to add to favorite.");
        }
      });
    }
  };

  useEffect(() => {
    Axios.post("/api/favorite/favoritecount", variables).then((response) => {
      if (response.data.success) {
        setFavoriteCount(response.data.favoritecount);
        console.log("Props", props);
        console.log("variables", variables);
        console.log("favoritecount", response.data);
      } else {
        alert("Error: Could not retrieve favoritecount.");
      }
    });

    Axios.post("/api/favorite/favorited", variables).then((response) => {
      if (response.data.success) {
        console.log("favorited:", response.data);
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

export default withRouter(Favorite);

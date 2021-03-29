import React, { useEffect } from "react";
import Axios from "axios";
import { Button } from "antd";

function Favorite(props) {
  const userFrom = props.userFrom;
  const movieId = props.movieId;
  const movieTitle = props.movieInfo.title;
  const moviePoster = props.movieInfo.backgdrop_path;
  const movieRuntime = props.movieInfo.runtime;

  useEffect(() => {
    // info about who liked what movies
    let variables = {
      userFrom,
      movieId,
    };
    Axios.post("/api/favorite/favoritecount", variables).then((response) => {
      if (response.data.success) {
      } else {
        alert("Error: Could not retrieve favoritecount.");
      }
    });
  }, []);

  return (
    <div>
      <Button>Favorite</Button>
    </div>
  );
}

export default Favorite;

import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { API_URL, API_KEY, IMG_BASE_URL } from "../../../Config";
import { Button } from "antd";
import MainImage from "../LandingPage/Sections/MainImage";
import MovieInfo from "./Sections/MovieInfo";

function MovieDetail(props) {
  let movieID = props.match.params.movieID;
  const [Movie, setMovie] = useState([]);

  useEffect(() => {
    let endpointCrew = `${API_URL}movie/${movieID}/credits?api_key=${API_KEY}`;
    let endpointInfo = `${API_URL}movie/${movieID}?api_key=${API_KEY}`;

    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        setMovie(response);
      });
  });

  return (
    <div>
      {/* HEADER */}
      <MainImage
        image={`${IMG_BASE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.original_title}
        text={Movie.overview}
      />
      {/* BODY */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        {/* Movie Info */}
        <MovieInfo movie={Movie} />
        <br />
        {/* Actors Grid */}
        <div style={{ display: "flex", justifyContent: "center", margin: "2rem" }}>
          <Button>Toggle Actor View</Button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(MovieDetail);

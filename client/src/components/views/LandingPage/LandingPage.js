import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Button } from "antd";
import "./LandingPage.css";
import { API_URL, API_KEY, IMG_BASE_URL } from "../../../Config";
import MainImage from "./Sections/MainImage";

function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);

  useEffect(() => {
    // Get the first 20 most popular movies from TMDB APIs
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        setMovies([response.result]);
        setMainMovieImage(response.results[0]);
        console.log(response);
      });
  }, []);

  return (
    <div style={{ width: "100%", margin: "0" }}>
      {/* GET MAIN IMAGE if MainMovieImage has been loaded*/}
      {MainMovieImage && (
        <MainImage
          image={`${IMG_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
          title={MainMovieImage.original_title}
          text={MainMovieImage.overview}
        />
      )}

      {/* MOVIE GRID CARDS */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2>Latest Movies</h2>
        <hr />
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button>Load More</Button>
      </div>
    </div>
  );
}

export default withRouter(LandingPage);

import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Button, Row } from "antd";
import "./LandingPage.css";
import { API_URL, API_KEY, IMG_BASE_URL } from "../../../Config";
import MainImage from "./Sections/MainImage";
import GridCards from "../Commons/GridCards";

function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [pageNum, setpageNum] = useState(0);

  useEffect(() => {
    // Get the first 20 most popular movies from TMDB APIs
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint);
  }, []);

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        setMovies([...Movies, ...response.results]);
        setMainMovieImage(response.results[0]);
        setpageNum(response.page);
      });
  };

  const loadMoreItems = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      pageNum + 1
    }`;
    fetchMovies(endpoint);
  };

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
        <Row gutter={[24, 24]}>
          {Movies &&
            Movies.map((movie, index) => (
              <React.Fragment key={index}>
                <GridCards
                  image={movie.poster_path ? `${IMG_BASE_URL}w500${movie.poster_path}` : null}
                  movieID={movie.id}
                  movieName={movie.original_title}
                />
              </React.Fragment>
            ))}
        </Row>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={loadMoreItems}>Load More</Button>
      </div>
    </div>
  );
}

export default withRouter(LandingPage);

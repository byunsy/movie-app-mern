import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { API_URL, API_KEY, IMG_BASE_URL } from "../../../Config";
import { Button, Row } from "antd";
import MainImage from "../LandingPage/Sections/MainImage";
import MovieInfo from "./Sections/MovieInfo";
import Favorite from "./Sections/Favorite";
import GridCards from "../Commons/GridCards";

function MovieDetail(props) {
  let movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState([]);
  const [Cast, setCast] = useState([]);
  const [Toggle, setToggle] = useState(false);
  const [Loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchDetailInfo();
  }, []);

  const fetchDetailInfo = () => {
    // TMDB movie APIs
    let endpointCast = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
    console.log("endpointInfo", endpointInfo);

    // Fetch movie information from API
    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        setMovie(response);
        setLoaded(true);
      });

    // Fetch cast information from API
    fetch(endpointCast)
      .then((response) => response.json())
      .then((response) => {
        setCast(response.cast);
      });
  };

  const toggleActors = () => {
    setToggle(!Toggle);
  };

  return (
    <div>
      {/* HEADER ========================================================== */}
      <MainImage
        image={`${IMG_BASE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.original_title}
        text={Movie.overview}
      />

      {/* BODY ============================================================ */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        {/* Movie Favorite Button - if loaded, display*/}
        {Loaded ? (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Favorite
              movieInfo={Movie}
              movieId={movieId}
              userFrom={localStorage.getItem("userId")}
            />
          </div>
        ) : (
          <div>loading...</div>
        )}

        {/* Movie Info */}
        <MovieInfo movie={Movie} />
        <br />

        {/* Actors Grid */}
        <div style={{ display: "flex", justifyContent: "center", margin: "2rem" }}>
          <Button onClick={toggleActors}>View Actors</Button>
        </div>
        {Toggle && (
          <Row gutter={[24, 12]}>
            {Cast &&
              Cast.map((cast, index) => (
                <React.Fragment key={index}>
                  <GridCards
                    image={cast.profile_path ? `${IMG_BASE_URL}w500${cast.profile_path}` : null}
                    characterName={cast.name}
                  />
                </React.Fragment>
              ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default withRouter(MovieDetail);

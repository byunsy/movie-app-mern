import React from "react";
import { Col } from "antd";
import "./GridCards.css";

function GridCards(props) {
  if (props.landingPage) {
    return (
      <Col lg={6} md={8} xs={12}>
        <div style={{ position: "relative", overflow: "hidden", backgroundColor: "black" }}>
          <a href={`/movies/${props.movieID}`}>
            <img
              style={{ width: "100%" }}
              src={props.image}
              alt={props.movieName}
              className={"landing-page-posters"}
            />
          </a>
        </div>
      </Col>
    );
  } else {
    return (
      <Col lg={4} md={6} xs={12}>
        <div style={{ position: "relative" }}>
          <img style={{ width: "100%" }} src={props.image} alt={props.characterName} />
          <h4>{props.characterName}</h4>
        </div>
      </Col>
    );
  }
}

export default GridCards;

import React from "react";
import { Descriptions } from "antd";

function MovieInfo(props) {
  let { movie } = props;
  return (
    <Descriptions bordered title="Movie Information">
      <Descriptions.Item label="Title">{movie.original_title}</Descriptions.Item>
      <Descriptions.Item label="Release Date">{movie.release_date}</Descriptions.Item>
      <Descriptions.Item label="Revenue">{movie.revenue}</Descriptions.Item>
      <Descriptions.Item label="Runtime">{movie.runtime} minutes</Descriptions.Item>
      <Descriptions.Item label="Rating Count">{movie.vote_count}</Descriptions.Item>
      <Descriptions.Item label="Status">{movie.status}</Descriptions.Item>
      <Descriptions.Item label="Popularity">{movie.popularity}</Descriptions.Item>
      <Descriptions.Item label="Rating Average" span={2}>
        {movie.vote_average} / 10
      </Descriptions.Item>
    </Descriptions>
  );
}

export default MovieInfo;

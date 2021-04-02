import React from "react";
import { Descriptions } from "antd";

function MovieInfo(props) {
  let { movie } = props;

  // Simple way to humanize revenue number
  const humanizeNum = (num) => {
    if (num) {
      var strNum = num.toString();
      var splitNum = [];
      for (let i = strNum.length; i >= 0; i -= 3) {
        var chunk = strNum.slice(i - 3, i);
        if (chunk) {
          splitNum.unshift(chunk);
        }
      }
      return "$" + splitNum.join();
    }
  };

  return (
    <Descriptions bordered title="Movie Information">
      <Descriptions.Item label="Title">{movie.original_title}</Descriptions.Item>
      <Descriptions.Item label="Release Date">{movie.release_date}</Descriptions.Item>
      <Descriptions.Item label="Revenue">{humanizeNum(movie.revenue)}</Descriptions.Item>
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

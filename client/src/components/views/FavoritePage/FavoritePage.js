import React, { useEffect, useState } from "react";
import { Table, Tag, Button } from "antd";
import Axios from "axios";

function FavoritePage() {
  const [Favorites, setFavorites] = useState([]);
  let userInfo = { userFrom: localStorage.getItem("userId") };

  useEffect(() => {
    fetchFavoriteMovie();
  }, []);

  // console.log(Favorites);

  const fetchFavoriteMovie = () => {
    Axios.post("/api/favorite/getFavoriteMovies", userInfo).then((response) => {
      if (response.data.success) {
        setFavorites(response.data.favorites);
      } else {
        alert("Error: Failed to get favorite movies.");
      }
    });
  };

  const onClickDelete = (movieId, userFrom) => {
    const variables = {
      movieId,
      userFrom,
    };

    Axios.post("/api/favorite/removeFromFavorite", variables).then((response) => {
      if (response.data.success) {
        fetchFavoriteMovie();
      } else {
        alert("Error: Failed to remove from favorite list.");
      }
    });
  };

  // Table Structure
  const columns = [
    {
      title: "Movie Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Movie Runtime",
      dataIndex: "runtime",
      key: "runtime",
    },
    {
      title: "Movie Genres",
      key: "tags",
      dataIndex: "tags",
      render: (tags) => (
        <>
          {tags.map((tag) => {
            return (
              <Tag color={"cyan"} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Remove from Favorite",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Button
          type="primary"
          danger
          // record holds data of the current row
          onClick={() => onClickDelete(record.movieId, record.userFrom)}
        >
          Delete
        </Button>
      ),
    },
  ];

  // Table Data Source
  // - creates and prepares data for each favorite movie
  // - shows title and runtime, but also holds values for movieId and userFrom
  const data = Favorites.map((favorite, index) => ({
    key: index,
    title: favorite.movieTitle,
    runtime: favorite.movieRuntime + " min",
    tags: ["genre"],
    movieId: favorite.movieId,
    userFrom: favorite.userFrom,
  }));

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h2 style={{ marginBottom: "2rem" }}>Favorite Page</h2>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
    </div>
  );
}

export default FavoritePage;

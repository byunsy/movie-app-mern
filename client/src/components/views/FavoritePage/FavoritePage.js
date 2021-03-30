import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Button } from "antd";
import Axios from "axios";

function FavoritePage() {
  const [Favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Attain favorite movies of given user from database
    Axios.post("/api/favorite/getFavoriteMovies", {
      userFrom: localStorage.getItem("userId"),
    }).then((response) => {
      if (response.data.success) {
        setFavorites(response.data.favorites);
      } else {
        alert("Error: Failed to get favorite movies.");
      }
    });
  }, []);

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
      title: "Remove from Favorite",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // Table Data Source
  const data = Favorites.map((favorite, index) => ({
    key: index,
    title: favorite.movieTitle,
    runtime: favorite.movieRuntime + " min",
  }));

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h2 style={{ marginBottom: "2rem" }}>Favorite Page</h2>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
    </div>
  );
}

export default FavoritePage;

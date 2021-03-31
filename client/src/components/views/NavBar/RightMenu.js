import React from "react";
import { Menu } from "antd";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        window.localStorage.removeItem("userId");
        window.localStorage.removeItem("remember");
        props.history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };
  // If the user is logged in
  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode="horizontal" style={{ display: "inline" }}>
        <Menu.Item key="mail">
          <a href="/login">Sign In</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Register</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode="horizontal" style={{ display: "inline" }}>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Sign Out</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);

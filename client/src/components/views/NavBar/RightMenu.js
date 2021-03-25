import React from "react";
import { Menu } from "antd";

function RightMenu() {
  return (
    <Menu mode="horizontal" style={{ display: "inline" }}>
      <Menu.Item key="mail">
        <a href="./login">Sign In</a>
      </Menu.Item>
      <Menu.Item key="app">
        <a href="./register">Register</a>
      </Menu.Item>
    </Menu>
  );
}

export default RightMenu;

import React from "react";
import { Menu } from "antd";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu() {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="home">
        <a href="/">Home</a>
      </Menu.Item>
      {/* <SubMenu title={<span>Projects</span>}>
        <MenuItemGroup title="Item 1">
          <Menu.Item key="setting:1">Option 1</Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
        </MenuItemGroup>
        <MenuItemGroup title="Item 2">
          <Menu.Item key="setting:3">Option 3</Menu.Item>
          <Menu.Item key="setting:4">Option 4</Menu.Item>
        </MenuItemGroup>
      </SubMenu> */}
      <Menu.Item key="favorite">
        <a href="/favorites">My Favorite</a>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;

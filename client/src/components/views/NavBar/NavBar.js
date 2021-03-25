import React, { useState } from "react";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { Drawer, Button } from "antd";

function Navbar() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <nav className="menuBar">
      <div className="logo">
        <a href="./">logo</a>
      </div>

      <div className="menuCon">
        <div className="leftMenu">
          <LeftMenu />
        </div>

        <div className="rightMenu">
          <RightMenu />
        </div>

        <Button className="barsMenu" type="link" onClick={showDrawer}>
          <span className="barsBtn"></span>
        </Button>

        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={true}
          onClose={onClose}
          visible={visible}
          width="70vw"
        >
          <a href="./">Home</a>
          <a href="./">Projects</a>
          <a href="./">About</a>
          <a href="./login">Sign in</a>
          <a href="./register">Register</a>
        </Drawer>
      </div>
    </nav>
  );
}
export default Navbar;

import React, { useState } from "react";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import NavDrawer from "./NavDrawer";
import { Button } from "antd";
import logo from "./movie-logo.png";

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
        {/* <a href="/"> */}
        <img src={logo} />
        {/* </a> */}
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

        <NavDrawer onClose={onClose} visible={visible} />
      </div>
    </nav>
  );
}
export default Navbar;

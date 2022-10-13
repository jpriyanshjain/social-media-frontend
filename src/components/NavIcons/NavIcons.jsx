import React from "react";
import { useDispatch } from "react-redux";
import { UilSetting } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import { Tooltip } from "@mantine/core";

import { IconHome, IconBell, IconMessageCircle } from "@tabler/icons";
import Notifications from "../Notifications/Notifications";

const NavIcons = () => {
  const dispatch = useDispatch();

  const comingSoonHandler = () => {
    dispatch({ type: "COMING_SOON" });
  };
  return (
    <div className="navIcons">
      <Tooltip label="Home" position="bottom" withArrow>
        <Link to="../home">
          <IconHome />
        </Link>
      </Tooltip>

      <Tooltip label="Setting" position="bottom" withArrow>
        <div onClick={comingSoonHandler}>
          <UilSetting />
        </div>
      </Tooltip>

      <Notifications />

      <Link to="/chat">
        <Tooltip label="Chat" position="bottom" withArrow>
          <div>
            <IconMessageCircle />
          </div>
        </Tooltip>
      </Link>
    </div>
  );
};

export default NavIcons;

import React from "react";
import { useDispatch } from "react-redux";
import { UilSetting } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import { Tooltip } from "@mantine/core";

import { IconHome, IconBell, IconMessageCircle } from "@tabler/icons";

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

      <Tooltip label="Notification" position="bottom" withArrow>
        <div onClick={comingSoonHandler}>
          <IconBell />
        </div>
      </Tooltip>

      <Tooltip label="Chat" position="bottom" withArrow>
        <Link to="../chat">
          <div onClick={comingSoonHandler}>
            <IconMessageCircle />
          </div>
        </Link>
      </Tooltip>
    </div>
  );
};

export default NavIcons;

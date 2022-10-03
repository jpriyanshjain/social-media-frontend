import React, { useState } from "react";
import "./RightSide.css";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import TrendCard from "../TrendCard/TrendCard";
import ShareModal from "../ShareModal/ShareModal";
import NavIcons from "../NavIcons/NavIcons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch();

  const comingSoonHandler = () => {
    dispatch({ type: "COMING_SOON" });
  };

  return (
    <div className="RightSide">
      <NavIcons />
      <TrendCard />

      <button className="button r-button" onClick={comingSoonHandler}>
        Share
      </button>
    </div>
  );
};

export default RightSide;

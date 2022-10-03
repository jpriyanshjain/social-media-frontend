import React from "react";
import "./RightSide.css";
import TrendCard from "../TrendCard/TrendCard";
import NavIcons from "../NavIcons/NavIcons";
import { useDispatch } from "react-redux";

const RightSide = () => {
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

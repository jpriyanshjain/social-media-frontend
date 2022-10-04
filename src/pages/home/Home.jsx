import React from "react";
import PostSide from "../../components/PostSide/PostSide";
import ProfileSide from "../../components/profileSide/ProfileSide";
import RightSide from "../../components/RightSide/RightSide";
import "./Home.css";
const Home = () => {
  // useEffect;
  return (
    <div className="Home">
      <ProfileSide />
      <PostSide location="home" />
      <RightSide />
    </div>
  );
};

export default Home;

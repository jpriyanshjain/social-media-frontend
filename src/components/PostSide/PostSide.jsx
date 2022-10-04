import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import Posts from "../Posts/Posts";
import PostShare from "../PostShare/PostShare";
import "./PostSide.css";
import { useSelector } from "react-redux";
import { getUserPost } from "../../api/PostsRequests";

const PostSide = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPost = async () => {
      if (user._id) {
        const { data } = await getUserPost(user._id);
        setPosts(data);
      }
    };
    getPost();
  }, [user]);

  return (
    <div className="PostSide">
      <PostShare />
      {location === "home" ? (
        <Posts />
      ) : (
        posts.length > 0 &&
        posts.map((post, id) => <Post data={post} id={id} />)
      )}
    </div>
  );
};

export default PostSide;

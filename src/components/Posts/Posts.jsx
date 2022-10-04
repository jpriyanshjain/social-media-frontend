import React, { useEffect } from "react";
import { getTimelinePosts } from "../../actions/PostsAction";
import "./Posts.css";
import Post from "../Post/Post";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Posts = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading, error } = useSelector((state) => state.postReducer);
  useEffect(() => {
    if (user._id) dispatch(getTimelinePosts(user._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, user]);

  if (!posts || error) return "No Posts";
  if (params.id) posts = posts.filter((post) => post.userId === params.id);
  return (
    <div className="Posts">
      {loading
        ? "loading ..."
        : posts.map((post, id) => {
            return <Post data={post} id={id} />;
          })}
    </div>
  );
};

export default Posts;

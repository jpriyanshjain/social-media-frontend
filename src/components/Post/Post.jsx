import React, { useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { likePost } from "../../api/PostsRequests";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../../utils/socketIo";

const Post = ({ data }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);

  const handleLike = () => {
    likePost(data._id, user._id);

    setLiked((prev) => !prev);
    if (liked) {
      setLikes((prev) => prev - 1);
    } else {
      const notificationData = {
        type: "Like",
        userId: data.userId,
        senderName: user.firstName,
      };
      socket.emit("send-notification", notificationData);
      setLikes((prev) => prev + 1);
    }
  };

  const comingSoonHandler = () => {
    dispatch({ type: "COMING_SOON" });
  };
  return (
    <div className="Post">
      <img src={data.image ? data.image : ""} alt="" />

      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img src={Comment} alt="" onClick={comingSoonHandler} />
        <img src={Share} alt="" onClick={comingSoonHandler} />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>
      <div className="detail">
        <span>
          <b>{data.name} </b>
        </span>
        <span>{data.desc}</span>
      </div>
    </div>
  );
};

export default Post;

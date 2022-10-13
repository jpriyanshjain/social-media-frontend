import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../actions/UserAction";
import { socket } from "../../utils/socketIo";

const User = ({ person }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();

  const [following, setFollowing] = useState(
    user?.following?.includes(person._id)
  );
  const handleFollow = () => {
    if (following) dispatch(unfollowUser(person._id, user));
    else {
      const notificationData = {
        type: "Follow",
        userId: person._id,
        senderName: user.firstName,
      };
      socket.emit("send-notification", notificationData);
      dispatch(followUser(person._id, user));
    }
    setFollowing((prev) => !prev);
  };
  return (
    <div className="follower">
      <div>
        <img
          src={person.profilePicture}
          alt="profile"
          className="followerImage"
        />
        <div className="name">
          <span>{person.firstName}</span>
          <span>@{person.username}</span>
        </div>
      </div>
      <button
        className={
          following ? "button fc-button UnfollowButton" : "button fc-button"
        }
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default User;

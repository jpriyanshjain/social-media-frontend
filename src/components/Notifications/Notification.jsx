const Notification = ({ data }) => {
  let component;
  switch (data?.type) {
    case "Like":
      component = `${data.senderName} Liked your post`;
      break;

    case "Follow":
      component = `${data.senderName} Followed you`;
      break;

    case "Message":
      component = `${data.senderName} messaged you`;
      break;

    default:
      component = "";
  }

  return (
    <div className="notification">
      <p>{component}</p>
      {data?.type === "Message" && (
        <p className="notification-chat-message">{data.message}</p>
      )}
    </div>
  );
};

export default Notification;

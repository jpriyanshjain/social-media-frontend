import React, { useEffect, useState } from "react";
import ChatBox from "../../components/ChatBox/ChatBox.jsx";
import Conversation from "../../components/Coversation/Conversation.jsx";
import UserSearch from "../../components/UserSearch/UserSearch";
import NavIcons from "../../components/NavIcons/NavIcons.jsx";
import "./Chat.css";
import { userChats, addChat } from "../../api/ChatRequests";
import { useSelector, useDispatch } from "react-redux";
import { getFollowUsers } from "../../actions/ChatAction";
import { socket } from "../../utils/socketIo";

const Chat = () => {
  let dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [addChatUser, setAddChatUser] = useState(null);

  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
    dispatch(getFollowUsers(user._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user._id]);

  // getting online users
  useEffect(() => {
    socket.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  //Get the message from socket server
  useEffect(() => {
    socket.on("recieve-message", (data) => {
      setReceivedMessage(data);
    });
  }, []);

  useEffect(() => {
    const addChatHandler = async () => {
      if (addChatUser) {
        const chatMember = chats.find((chat) =>
          chat.members.includes(addChatUser)
        );
        if (!chatMember) {
          try {
            const { data } = await addChat(user._id, addChatUser);
            setChats((perState) => [...perState, data]);
            setCurrentChat(data);
          } catch (error) {
            console.error(error);
          }
        } else {
          setCurrentChat(chatMember);
        }
      }
    };
    addChatHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addChatUser]);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <UserSearch setAddChat={setAddChatUser} />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div
                onClick={() => {
                  setCurrentChat(chat);
                }}
                key={chat._id}
              >
                <Conversation
                  data={chat}
                  currentUser={user._id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <NavIcons />
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
};

export default Chat;

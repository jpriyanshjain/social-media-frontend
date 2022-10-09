import socketIo from "socket.io-client";

export const socket = socketIo.connect(process.env.REACT_APP_SOCKET_URL);

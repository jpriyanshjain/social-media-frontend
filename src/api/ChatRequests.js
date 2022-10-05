import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const addChat = (senderId, receiverId) =>
  API.post(`/chat`, { senderId, receiverId });
export const userChats = (id) => API.get(`/chat/${id}`);

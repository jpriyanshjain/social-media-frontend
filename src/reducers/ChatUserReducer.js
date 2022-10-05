const initialState = {
  users: [],
  chatUser: [],
  loading: false,
  error: false,
};

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USERS_START":
      return {
        ...state,
        loading: true,
      };
    case "GET_USERS_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        users: action.data,
      };
    case "GET_USERS_FAIL":
      return {
        ...state,
        loading: false,
        error: true,
      };

    case "GET_CHAT_USER_START":
      return {
        ...state,
        loading: true,
      };
    case "GET_CHAT_USERS_SUCCESS":
      return {
        ...state,
        chatUser: action.data,
      };

    default:
      return state;
  }
};

export default ChatReducer;

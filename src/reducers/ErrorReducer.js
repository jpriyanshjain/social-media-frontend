const initialState = {
  type: "",
  message: "",
  display: false,
};

const ErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SUCCESS":
      return {
        ...state,
        type: "success",
        message: action.message,
        display: true,
      };
    case "ERROR":
      return {
        ...state,
        type: "error",
        message: action.message,
        display: true,
      };
    case "COMING_SOON":
      return {
        ...state,
        type: "Default",
        message: "Feature Coming Soon",
        display: true,
      };
    case "CLOSE_TOSTIFY":
      return {
        ...state,
        display: false,
        message: action.message,
      };
    default:
      return state;
  }
};

export default ErrorReducer;

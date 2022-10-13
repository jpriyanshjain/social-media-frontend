import * as UserApi from "../api/UserRequests";

export const getUser = (id) => async (dispatch) => {
  try {
    const { data } = await UserApi.getUser(id);
    dispatch({ type: "GET_USER", data: data });
  } catch (error) {
    dispatch({
      type: "ERROR",
      message: error?.response?.data ?? "error occurred",
    });
  }
};

export const updateUser = (id, formData) => async (dispatch) => {
  dispatch({ type: "UPDATING_START" });
  try {
    const { data } = await UserApi.updateUser(id, formData);
    dispatch({ type: "UPDATING_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "UPDATING_FAIL" });
  }
};

export const followUser = (id, data) => async (dispatch) => {
  dispatch({ type: "FOLLOW_USER", data: id });
  UserApi.followUser(id, data);
};

export const unfollowUser = (id, data) => async (dispatch) => {
  dispatch({ type: "UNFOLLOW_USER", data: id });
  UserApi.unfollowUser(id, data);
};

export const updateNotification = (id, notification) => async (dispatch) => {
  try {
    UserApi.updateNotification(id);
    dispatch({ type: "UPDATE_NOTIFICATION", data: notification });
  } catch (error) {
    dispatch({
      type: "ERROR",
      message: error?.response?.data ?? "error occurred",
    });
  }
};

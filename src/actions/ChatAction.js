import * as UserApi from "../api/UserRequests";

export const getFollowUsers = (id) => async (dispatch) => {
  try {
    dispatch({ type: "GET_USERS_START" });
    const { data } = await UserApi.getFollowUsers(id);
    dispatch({ type: "GET_USERS_SUCCESS", data: data.following });
  } catch (error) {
    dispatch({ type: "GET_USERS_FAIL" });
  }
};

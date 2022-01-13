import { ActionTypes } from "../const/actionTypes";

export const userLogin = (user) => {
  return {
    type: ActionTypes.USER_LOGIN,
    payload: { auth: user.authtoken, ...user.user },
  };
};

export const userLogout = () => {
  return {
    type: ActionTypes.USER_LOGOUT,
    payload: {},
  };
};

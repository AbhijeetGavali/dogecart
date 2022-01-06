import { ActionTypes } from "../constants/actionTypes";

export const userLogin = (auth) => {
  return {
    type: ActionTypes.USER_LOGIN,
    payload: { auth },
  };
};

export const userLogout = () => {
  return {
    type: ActionTypes.USER_LOGOUT,
    payload: {},
  };
};

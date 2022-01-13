import { ActionTypes } from "../const/actionTypes";
const intialState = {
  user: {
    login: false,
    auth: "",
  },
};

export const userReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.USER_LOGIN:
      return {
        ...state,
        user: {
          login: true,
          ...payload,
        },
      };

    case ActionTypes.USER_LOGOUT:
      return {
        ...state,
        user: {
          login: false,
          auth: "",
        },
      };

    default:
      return state;
  }
};

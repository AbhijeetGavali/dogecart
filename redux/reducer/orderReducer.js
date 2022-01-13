import { ActionTypes } from "../const/actionTypes";
const intialState = {
  shoppingCart: [],
};

export const orderReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.PROCEED_TO_BUY_FROM_CART:
      return {
        ...state,
        shoppingCart: payload.cart.map((product) => ({ ...product })),
      };

    case ActionTypes.PROCEED_TO_BUY_PRODUCT:
      return {
        ...state,
        shoppingCart: [{ ...payload.product, count: 1 }],
      };

    case ActionTypes.BUY_PRODUCT:
      return {
        ...state,
        shoppingCart: [],
      };

    default:
      return state;
  }
};

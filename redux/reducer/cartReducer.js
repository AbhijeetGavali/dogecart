import { ActionTypes } from "../const/actionTypes";

const intialState = {
  cart: [],
};

export const cartReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ADD_TO_CART:
      var exist = false;
      var cart = state.cart.map((product) => {
        if (product.id === payload.id) {
          if (product.choice.color === payload.choice.color) {
            if (product.choice.size === payload.choice.size) {
              exist = true;
            }
          }
        }
        return { ...product };
      });
      if (exist) {
        return {
          ...state,
          cart,
        };
      } else {
        cart.push({ ...payload, count: 1 });
        return { ...state, cart };
      }

    case ActionTypes.INCREASE_PRODUCT:
      return {
        ...state,
        cart: state.cart.map((product, idx) =>
          idx === payload.idx
            ? { ...product, count: product.count + 1 }
            : product
        ),
      };

    case ActionTypes.DECREASE_PRODUCT:
      return {
        ...state,
        cart: state.cart.map((product, idx) =>
          idx === payload.idx
            ? { ...product, count: product.count - 1 }
            : product
        ),
      };

    case ActionTypes.REMOVE_PRODUCT:
      return {
        ...state,
        cart: state.cart.filter((product, idx) =>
          idx === payload.idx ? false : true
        ),
      };

    default:
      return state;
  }
};

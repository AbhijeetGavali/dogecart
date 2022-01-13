import { ActionTypes } from "../const/actionTypes";

export const addToCart = (product) => {
  return {
    type: ActionTypes.ADD_TO_CART,
    payload: { ...product },
  };
};

export const incrementCart = (idx) => {
  return {
    type: ActionTypes.INCREASE_PRODUCT,
    payload: { idx },
  };
};

export const decrementCart = (idx) => {
  return {
    type: ActionTypes.DECREASE_PRODUCT,
    payload: { idx },
  };
};

export const removeFromCart = (idx) => {
  return {
    type: ActionTypes.REMOVE_PRODUCT,
    payload: { idx },
  };
};

import { ActionTypes } from "../const/actionTypes";

export const buyFromCart = (cart) => {
  return {
    type: ActionTypes.PROCEED_TO_BUY_FROM_CART,
    payload: { cart },
  };
};

export const buyProduct = (product) => {
  return {
    type: ActionTypes.PROCEED_TO_BUY_PRODUCT,
    payload: { product },
  };
};

export const purchaseComplete = () => {
  return {
    type: ActionTypes.BUY_PRODUCT,
    payload: {},
  };
};

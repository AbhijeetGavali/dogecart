import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { cartReducer } from "./cartReducer";
import { orderReducer } from "./orderReducer";

const reducers = combineReducers({
  user: userReducer,
  order: orderReducer,
  cart: cartReducer,
});

export default reducers;

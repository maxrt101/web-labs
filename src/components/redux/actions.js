import { ADD_TO_CART, UPDATE_CART_ITEM, DELETE_FROM_CART } from "./types";

export const addToCart = ({id, kilometrage, manufacturer, model, plate, price, units=1}) => ({
  type: ADD_TO_CART,
  payload: {id, kilometrage, manufacturer, model, plate, price, units}
});

export const updateCartItem = ({id, units}) => ({
  type: UPDATE_CART_ITEM,
  payload: {id, units}
});

export const deleteFromCart = (car) => ({
  type: DELETE_FROM_CART,
  payload: car
});

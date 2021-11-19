import { ADD_TO_CART, UPDATE_CART_ITEM, DELETE_FROM_CART } from "./types";

export default function Reducer(state=[], action=[]) {
  const findIndex = (id) => state.findIndex(p => p.id === id)

  switch (action.type) {
    case ADD_TO_CART: {
      let index = findIndex(action.payload.id);
      if (index !== -1) {
        state[index].units += 1
        return state.concat([]);
      }
      return state.concat(action.payload);
    }
    case UPDATE_CART_ITEM: {
      let index = findIndex(action.payload.id);
      if (state[index].units === 0 && action.payload.units === -1) {
        return [...state.slice(0, index), ...state.slice(index+1)]
      }
      state[index].units += action.payload.units;
      return state.concat([]);
    }
    case DELETE_FROM_CART: {
      let index = findIndex(action.payload.id);
      return [...state.slice(0, index), ...state.slice(index+1)];
    }
  }

  return state;
}
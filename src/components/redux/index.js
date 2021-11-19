import { createStore, combineReducers } from 'redux';
import Reducer from "./reducer";

const reducer = combineReducers({
  cart: Reducer
});

export const store = createStore(reducer);

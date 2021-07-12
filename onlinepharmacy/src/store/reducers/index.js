/*import { combineReducers } from 'redux'
import auth from './auth';
import medicine from './medicine';
import search from "./search";

export default combineReducers({
  auth,
  search,
  medicine
})*/

import { combineReducers } from 'redux'
import search from "./search";
import auth from './auth';
import cart from './cart';

export default combineReducers({
  auth,
  search,
  cart
})
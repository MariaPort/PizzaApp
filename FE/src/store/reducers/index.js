import {combineReducers} from 'redux';

import {mainReducer} from './main';
import {cartReducer} from './cart';
import {userReducer} from './user';
import {modalsReducer} from './modals';

export const Reducer = combineReducers({
  main: mainReducer,
  cart: cartReducer,
  user: userReducer,
  modals: modalsReducer,
});
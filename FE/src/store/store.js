import {
    createStore,
    compose,
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';

import {Reducer} from './reducers';

const composeEnhancers = typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

export const store = createStore(Reducer, composeEnhancers(applyMiddleware(thunk)));
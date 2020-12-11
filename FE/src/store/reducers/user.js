import {
    SET_USER,
    SET_ORDERS,
    RESET_ORDERS,
} from '../actions';

const initialState = {
    user: null,
    previousOrders: [],
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDERS:
        return {
            ...state,
            previousOrders: [...action.payload.orders],
        };
        case RESET_ORDERS:
        return {
            ...state,
            previousOrders: initialState.previousOrders,
        };
        case SET_USER:
        return {
            ...state,
            user: action.payload.user,
        };
      default:
        return state;
    }
  };
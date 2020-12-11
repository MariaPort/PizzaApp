import {
    SET_TYPE,
    RESET_TYPE,
} from '../actions';

const initialState = {
    type: null,
};

export const modalsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TYPE:
        return {
            ...state,
            type: action.payload.type,
        };
        case RESET_TYPE:
        return {
            ...state,
            type: null,
        };
      default:
        return state;
    }
  };
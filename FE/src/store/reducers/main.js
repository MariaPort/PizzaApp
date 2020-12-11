import {USD} from '../../constants';
import {
    SET_ITEMS,
    SET_CURRENCY,
    SET_IS_LOADING,
} from '../actions';

// const items = new Array(10).fill(
//     {
//         id: Math.random(),
//         name: 'PEPPERONI',
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie urna eget urna tempus.',
//         priceEuro: '12',
//         priceDollar: '15',
//         imageUrl: 'https://dodopizza-a.akamaihd.net/static/Img/Products/5dffe4c7d3bc49668f50c1d08d920992_292x292.jpeg',
//     }
// );

const initialState = {
    items: [],
    currency: USD,
    isLoading: false,
};

export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ITEMS:
        return {
            ...state,
            items: [...action.payload.items],
        };
        case SET_CURRENCY:
        return {
            ...state,
            currency: action.payload.currency,
        };
        case SET_IS_LOADING:
        return {
            ...state,
            isLoading: action.payload.loading,
        };
      default:
        return state;
    }
  };
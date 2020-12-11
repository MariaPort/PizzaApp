import {
    SET_CART_ITEMS,
    ADD_CART_ITEM,
    SET_CART_ITEM_AMOUNT,
    DELETE_CART_ITEM,
    RESET_CART_ITEMS,
} from '../actions';

// const items = new Array(3).fill(
//     {
//         id: Math.random(),
//         name: 'PEPPERONI',
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie urna eget urna tempus.',
//         priceEuro: '12',
//         priceDollar: '15',
//         amount: 1,
//         imageUrl: 'https://dodopizza-a.akamaihd.net/static/Img/Products/5dffe4c7d3bc49668f50c1d08d920992_292x292.jpeg',
//     }
// );

const initialState = {
    cartItems: [],
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CART_ITEMS:
        return {
            ...state,
            cartItems: [...action.payload.items],
        };
        case ADD_CART_ITEM:
        return {
            ...state,
            cartItems: [
                ...state.cartItems,
                action.payload.item,
            ],
        };
        case SET_CART_ITEM_AMOUNT: {
            const items = [...state.cartItems].map((item) => {
                if (item._id === action.payload.id) {
                    return {
                        ...item,
                        amount: action.payload.value,
                    }
                }
                return item;
            });

            return {
                ...state,
                cartItems: [...items],
            };
        };
        case DELETE_CART_ITEM:
        return {
            ...state,
            cartItems: [
                ...state.cartItems.filter(cartItem => cartItem._id !== action.payload.id),
            ],
        };
        case RESET_CART_ITEMS:
        return {
            ...state,
            cartItems: [],
        };
      default:
        return state;
    }
  };
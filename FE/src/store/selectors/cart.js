import {createSelector} from 'reselect';

import {
    USD,
    EURO_EXCHANGE_RATE,
} from '../../constants';
import {getCurrency} from './main';

export const getRawCartItems = (state) => state.cart.cartItems;
export const getCartItems = createSelector(
    [getRawCartItems, getCurrency],
    (cartItems, currency) => {
        return cartItems.map((cartItem) => ({
        ...cartItem,
        price: Math.round(currency === USD ? cartItem.price : cartItem.price * EURO_EXCHANGE_RATE)
        }))
    }
);
export const getCartItemsAmount = (state) => state.cart.cartItems.length;
export const getTotal = createSelector(
    [getCartItems],
    (cartItems) => {
        const total = cartItems.reduce((acc, cartItem) => {
            const {
                amount,
                price,
            } = cartItem;

            return acc + (amount * price);
        }, 0);
      return total;
    },
);
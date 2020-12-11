import {message} from 'antd';
import Cookies from 'js-cookie';

import {ORDER_URL} from '../../constants';
import {
    getRawCartItems,
    getRawItems,
    getUser,
    getCurrency,
    getTotal,
} from '../selectors';

export const SET_CART_ITEMS = 'SET_CART_ITEMS';
export const ADD_CART_ITEM = 'ADD_CART_ITEM';
export const DELETE_CART_ITEM = 'DELETE_CART_ITEM';
export const SET_CART_ITEM_AMOUNT = 'SET_CART_ITEM_AMOUNT';
export const RESET_CART_ITEMS = 'RESET_CART_ITEMS';

const MESSAGE_DUARTION = 6; // sec
const MESSAGE = 'Thank you! Our manager will contact you shortly';

const updateCartInfoInLocalStorage = () => (dispatch, getState) => {
    const state = getState();
    const cartItems = getRawCartItems(state);

    localStorage.setItem('cart', JSON.stringify(cartItems));
}

export const setCartItems = () => {
    const items = JSON.parse(localStorage.getItem('cart'));
    if (items.length) {
        return {type: SET_CART_ITEMS, payload: {items}};
    }
    return {type: SET_CART_ITEMS, payload: {items: []}};
    
};
export const addCartItem = (item) => (dispatch, getState) => {
    const state = getState();
    const originalItems = getRawItems(state);
    const cartItems = getRawCartItems(state);
    const foundItem = cartItems.find(cartItem => cartItem._id === item._id);

    let updatedItems = [];
    if (foundItem){
        updatedItems = cartItems.map(cartItem => (
            cartItem._id === item._id
            ? {
                ...cartItem,
                amount: ++cartItem.amount,
            }
            : cartItem
        ));
    } else {
        const originalItem = originalItems.find(originItem => originItem._id === item._id)
        updatedItems = [
            ...cartItems,
            {...originalItem, amount: 1},
        ];
    }
    
    dispatch({type: SET_CART_ITEMS, payload: {items: updatedItems}});
    dispatch(updateCartInfoInLocalStorage());
};
export const deleteCartItem = (id) => (dispatch, getState) => {
    dispatch({type: DELETE_CART_ITEM, payload: {id}});

    dispatch(updateCartInfoInLocalStorage());
};
export const setCartItemAmount = (id, value) => (dispatch, getState) => {
    dispatch({type: SET_CART_ITEM_AMOUNT, payload: {id, value}});

    dispatch(updateCartInfoInLocalStorage());
};
export const resetCartItems = () => (dispatch, getState) => {
    localStorage.removeItem('cart');
    dispatch({type: RESET_CART_ITEMS});
};
export const sendOrder = (values) => async (dispatch, getState) => {
    const state = getState();
    const {email} = values;
    const userId = getUser(state);
    const cart = getRawCartItems(state);
    const currency = getCurrency(state).toLowerCase();
    const total = getTotal(state);
    const date = new Date().toISOString();
    const token = Cookies.get('token');

    const requestBody = {
        userId,
        email,
        cart,
        total,
        currency,
        date,
    };
    console.log(requestBody);
    try {
        const res = await fetch(
            ORDER_URL, 
            {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `token=${token}`,
                  },
            }
        );
    
        if (!res.ok) {
            throw new Error(`Something went wrong(`);
        }

        message.success(MESSAGE, MESSAGE_DUARTION);
        dispatch(resetCartItems());
    } catch (error) {
        message.error('Something went wrong(');
    }
};

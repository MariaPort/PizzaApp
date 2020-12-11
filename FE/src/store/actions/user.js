import {message} from 'antd';
import Cookies from 'js-cookie';

import {
    REGISTRATION_URL,
    LOGIN_URL,
    PREVIOUS_ORDERS_URL,
} from '../../constants';
import {getUser} from '../selectors';

export const SET_ORDERS = 'SET_ORDERS';
export const SET_USER = 'SET_USER';
export const RESET_ORDERS = 'RESET_ORDERS';

export const setOrders = (orders) => ({type: SET_ORDERS, payload: {orders}});
export const loadPrevOrders = () => async (dispatch, getState) => {
    const state = getState();
    const user = getUser(state);
    const token = Cookies.get('token');

    try {
        const res = await fetch(
            `${PREVIOUS_ORDERS_URL}${user}`, 
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `token=${token}`,
                  },
            }
        );
    
        if (!res.ok) {
            throw new Error(`Something went wrong(`);
        }
        const {result} = await res.json();
    
        dispatch(setOrders(result));
    } catch (error) {
        message.error('Something went wrong(');
    }
};
export const resetOrders = () => ({type: RESET_ORDERS});
export const setUser = (user) => (dispatch, getState) => {
    user
    ? localStorage.setItem('user', JSON.stringify(user))
    : localStorage.removeItem('user');

    dispatch({type: SET_USER, payload: {user}});
};
export const registerUser = (values) => async (dispatch, getState) => {
    try {
        const res = await fetch(
            REGISTRATION_URL, 
            {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json',
                  },
            }
        );
    
        if (!res.ok) {
            throw new Error(`Something went wrong(`);
        }
    
        message.info('User added');
    } catch (error) {
        message.error('Something went wrong(');
    }
};
export const userLogin = (values) => async (dispatch, getState) => {
    try {
        const res = await fetch(
            LOGIN_URL, 
            {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json',
                  },
            }
        );
    
        if (!res.ok) {
            throw new Error(`Something went wrong(`);
        }

        const {result} = await res.json();
    
        dispatch(setUser(result.id));
    } catch (error) {
        message.error('Something went wrong(');
    }
};
export const resetUser = (values) => (dispatch, getState) => {
    dispatch(setOrders([]));
    dispatch(setUser(null));
};
export const setUserFromStorage = () => (dispatch, getState) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && dispatch(setUser(user));
};

export const USD = 'USD';
export const EUR = 'EUR';

export const EURO_EXCHANGE_RATE = 0.8;

export const modalTypes = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    REGISTRATION: 'REGISTRATION',
    ORDER: 'ORDER',
}

export const BASE_URL = `https://${window.location.host}/api/v1`;
export const ITEMS_URL = `${BASE_URL}/products/pizza`;
export const PREVIOUS_ORDERS_URL = `${BASE_URL}/orders/`;
export const REGISTRATION_URL = `${BASE_URL}/user/registration`;
export const LOGIN_URL = `${BASE_URL}/token/obtaining`;
export const ORDER_URL = `${BASE_URL}/order`;
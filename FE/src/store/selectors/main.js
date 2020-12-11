import {createSelector} from 'reselect';

import {
    USD,
    EURO_EXCHANGE_RATE,
} from '../../constants';

export const getRawItems = (state) => state.main.items;
export const getCurrency = (state) => state.main.currency;
export const getItems = createSelector(
    [getRawItems, getCurrency],
    (items, currency) => {
        return items.map((item) => ({
            ...item,
            price: Math.round(currency === USD ? item.price : item.price * EURO_EXCHANGE_RATE),
        }))
    }
);
export const getCurrencySign = createSelector(
    [getCurrency],
    (currency) => currency === USD ? '$' : '€'
);
export const getIsLoading = (state) => state.main.isLoading;
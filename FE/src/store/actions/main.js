import {ITEMS_URL} from '../../constants';

export const SET_ITEMS = 'SET_ITEMS';
export const SET_CURRENCY = 'SET_CURRENCY';
export const SET_IS_LOADING = 'SET_IS_LOADING';

export const setItems = (items) => ({type: SET_ITEMS, payload: {items}});
export const setCurrency = (currency) => ({ type: SET_CURRENCY, payload: {currency}});
export const setIsLoading = (loading) => ({type: SET_IS_LOADING, payload: {loading}});

export const loadItems = () => {
    return async (dispatch) => {
        dispatch(setIsLoading(true));
        const res = await fetch(ITEMS_URL);

        if (!res.ok) {
            throw new Error(`Could not fetch ${ITEMS_URL}, receive ${res.status}`);
        }

        const {result} = await res.json();

        dispatch(setItems(result));
        dispatch(setIsLoading(false));
    };
}

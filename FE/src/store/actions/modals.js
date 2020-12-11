export const SET_TYPE = 'SET_TYPE';
export const RESET_TYPE = 'RESET_TYPE';

export const setModalType = (type) => ({type: SET_TYPE, payload: {type}});
export const resetModalType = () => ({type: RESET_TYPE});

export const getPrevOrders = (state) => {
    return state.user.previousOrders
        .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
        .map((order, i) => ({...order, number: i+1 }));
};
export const getUser = (state) => state.user.user;
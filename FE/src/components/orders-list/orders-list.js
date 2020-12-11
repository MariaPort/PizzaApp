import * as React from 'react';

import './orders-list.css';
import {Order} from '../order';

export const OrdersList = ({orders = {}}) => {
    return (
        <div className="orders-list__container">
            {orders.map((order) => (<Order order={order} />))}
        </div>
    );
}
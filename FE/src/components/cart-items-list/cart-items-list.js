import * as React from 'react';
import {Divider} from 'antd';

import './cart-items-list.css';
import {CartItem} from '../cart-item';

export const CartItemsList = ({
    items = [],
    currencySign,
    onChangeAmount,
    onDeleteCartItem,
}) => {
    return (
        <div className="cart-items-list__container">
            <Divider />
            {
                items.map((item) => (
                    <CartItem 
                        item={item}
                        key={item._id}
                        currencySign={currencySign}
                        onChangeAmount={onChangeAmount}
                        onDeleteCartItem={onDeleteCartItem}
                    />
                ))
            }
        </div>
    );
}
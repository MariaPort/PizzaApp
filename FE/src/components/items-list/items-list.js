import * as React from 'react';

import './items-list.css';
import {Item} from '../item';

export const ItemsList = ({
    items = [],
    onAddItem,
    currencySign,
}) => {
    return (
        <div className="items-list__container">
            {
                items.map((item) => (
                    <Item 
                        item={item}
                        key={item._id}
                        onAddItem={onAddItem}
                        currencySign={currencySign}
                    />)
                )
            }
        </div>
    );
}
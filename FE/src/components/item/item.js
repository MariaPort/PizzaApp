import * as React from 'react';
import {
    Button,
    Typography,
} from 'antd';

import './item.css';

export const Item = ({
    item = {},
    onAddItem,
    currencySign,
}) => {
    const {
        title,
        ingredients,
        price,
        image,
    } = item;

    const handleAddToCart = React.useCallback(() => {
        onAddItem(item);
    })

    return (
        <div className="item__container">
            <img
                className="item__image"
                src={image}
                alt={title}
            />
            <div className="item__title-block">
                <Typography.Title level={2}>{title}</Typography.Title>
                <Typography.Paragraph 
                    ellipsis={{ rows: 3}}
                >
                    {ingredients}
                </Typography.Paragraph>
            </div>
            <div className="item__bottom-block">
                <Typography.Title level={3}>{`${currencySign}${price}`}</Typography.Title>
                <Button 
                    type="primary"
                    shape="round"
                    onClick={handleAddToCart}
                >
                    Add to cart
                </Button>
            </div>
        </div>
    );
}
import * as React from 'react';
import {
    Button,
    Typography,
    Divider,
    InputNumber,
} from 'antd';
import {DeleteFilled} from '@ant-design/icons';

import './cart-item.css';

export const CartItem = ({
    item = {},
    currencySign,
    onChangeAmount,
    onDeleteCartItem,
}) => {
    const {
        _id,
        title,
        ingredients,
        price,
        image,
        amount,
    } = item;
    const calculatedPrice = React.useMemo(() => price * amount, [price, amount]);

    const handleOnCountChange = React.useCallback((value) => {
        onChangeAmount(_id, value);
    })

    const handleOnDeleteCartItem = React.useCallback(() => onDeleteCartItem(_id));

    return (
        <>
            <div className="cart-item__container">
                <div className="cart-item__right-block">
                    <img
                        className="cart-item__image"
                        src={image}
                        alt={title}
                    />
                    <div className="cart-item__title-description">
                        <Typography.Title level={3}>{title}</Typography.Title>
                        <Typography.Paragraph 
                            ellipsis={{ rows: 3}}
                        >
                            {ingredients}
                        </Typography.Paragraph>
                    </div>
                </div>
                <div className="cart-item__left-block">
                    <div className="cart-item__counter">
                        <InputNumber 
                            size="small"
                            min={1}
                            max={12}
                            defaultValue={amount}
                            onChange={handleOnCountChange}
                        />
                    </div>
                    <div className="cart-item__price">
                        <Typography.Title level={3}>{`${calculatedPrice} ${currencySign}`}</Typography.Title>
                    </div>
                    <div className="cart-item__delete">
                        <Button 
                            type="primary"
                            icon={<DeleteFilled />}
                            size="small"
                            onClick={handleOnDeleteCartItem}
                        />
                    </div>
                </div>
            </div>
            <Divider />
        </>
    );
}
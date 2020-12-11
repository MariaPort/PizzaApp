import * as React from 'react';
import {
    Collapse,
    Typography,
} from 'antd';

import './order.css';

export const Order = ({order = {}}) => {
    const {
        _id,
        number,
        products,
        date,
        total,
    } = order;
    return (
        <div className="order__container" key={_id}>
            <Collapse defaultActiveKey={['1']}>
                <Collapse.Panel header={`Order #${number} - ${date}`}>
                    <div className="order__items">
                        <Typography.Title level={3}>{products}</Typography.Title>
                    </div>
                    <div className="order__total">{`Total: ${Math.floor(total)} $`}</div>
                </Collapse.Panel>
            </Collapse>
        </div>
    );
}
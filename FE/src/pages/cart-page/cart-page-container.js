import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    Typography,
    Button,
} from 'antd';

import './cart-page.css';
import {
    getCartItems,
    getTotal,
    getCurrencySign,
    getCartItemsAmount,
    setCartItemAmount,
    setCartItems,
    deleteCartItem,
    setModalType,
} from '../../store';
import {CartItemsList} from '../../components';
import {modalTypes} from '../../constants';

const DELIVERY = 3.5;

export class CartPageContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(localStorage.getItem('cart')){
            this.props.setCartItemsAction()
        }
    }
    
    onOrderClick() {
        this.props.setModalTypeAction(modalTypes.ORDER);
    }

    render() {
        const {
            cartItems,
            cartItemsAmount,
            total,
            currencySign,
            changeAmountAction,
            deleteCartItemAction,
        } = this.props;

        const calculatedTotal = total + DELIVERY;
       
        return (
            <div className="cart-page__container">
                <Typography.Title level={1}>Your Cart</Typography.Title>
                <CartItemsList 
                    items={cartItems}
                    currencySign={currencySign}
                    onChangeAmount={changeAmountAction}
                    onDeleteCartItem={deleteCartItemAction}
                />
                {cartItemsAmount === 0 && <Typography.Title level={3}>Empty(</Typography.Title>}
                <div className="cart-page__total">
                    {cartItemsAmount !== 0 && (
                        <>
                            <Typography.Title level={5}>{`+ Delivery: ${DELIVERY} ${currencySign}`}</Typography.Title>
                            <Typography.Title level={3}>{`Total: ${calculatedTotal} ${currencySign}`}</Typography.Title>
                        </>
                    )}
                </div>
                <div className="cart-page__buttons">
                    <Button size="large">
                        <Link to="/">Back to menu</Link>
                    </Button>
                    <Button 
                        type="primary"
                        size="large"
                        disabled={cartItemsAmount === 0}
                        onClick={this.onOrderClick.bind(this)}
                    >
                        Order
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cartItems: getCartItems(state),
        cartItemsAmount: getCartItemsAmount(state),
        total: getTotal(state),
        currencySign: getCurrencySign(state),
    };
  };
  
  const mapDispatchToProps = {
    changeAmountAction: setCartItemAmount,
    deleteCartItemAction: deleteCartItem,
    setModalTypeAction: setModalType,
    setCartItemsAction: setCartItems,
  };

export const CartPage = connect(mapStateToProps, mapDispatchToProps)(CartPageContainer);

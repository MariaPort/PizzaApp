import React, {Component} from 'react';
import {connect} from 'react-redux';

import {modalTypes} from '../constants';
import {
    getModalType,
    resetModalType,
} from '../store';
import {LoginForm} from './login-form';
import {OrderForm} from './order-form';

export class ModalContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            type,
            resetModalTypeAction,
        } = this.props;

        return (
            <>
                {
                    (type === modalTypes.LOGIN || type === modalTypes.REGISTRATION) && 
                    <LoginForm type={type} onClose={resetModalTypeAction} />
                }
                {type === modalTypes.ORDER && <OrderForm onClose={resetModalTypeAction}/>}
            </>
            
        );
    }
}

const mapStateToProps = (state) => {
    return {
        type: getModalType(state),
    };
  };
  
  const mapDispatchToProps = {
        resetModalTypeAction: resetModalType,
  };

export const Modal = connect(mapStateToProps, mapDispatchToProps)(ModalContainer);

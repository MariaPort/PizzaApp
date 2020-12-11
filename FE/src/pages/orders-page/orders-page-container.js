import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {OrdersList} from '../../components';
import {
    loadPrevOrders,
    getPrevOrders,
    getUser,
} from '../../store';

export class OrdersPageContainer extends Component {
    constructor(props) {
        super(props);
    }
    
    componentWillMount() {
        if (!this.props.user) {
            this.props.history.push({pathname: '/'});
        }
    }

    componentDidMount() {
        if (this.props.orders.length === 0 && this.props.user) {
            this.props.loadPrevOrdersAction();
        }
    }
    
    render() {
        const {
            orders,
            user,
        } = this.props;
        return user && (
            <div className="main-page__container">
                <OrdersList orders={orders} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      orders: getPrevOrders(state),
      user: getUser(state),
    };
  };
  
  const mapDispatchToProps = {
    loadPrevOrdersAction: loadPrevOrders,
  };

export const OrdersPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(OrdersPageContainer));
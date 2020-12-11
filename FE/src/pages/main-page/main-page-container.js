import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Spin} from 'antd';

import {
    getItems,
    loadItems,
    getIsLoading,
    addCartItem,
    getCurrencySign,
} from '../../store';
import {ItemsList} from '../../components';

export class MainPageContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(this.props.items.length === 0) {
            this.props.loadItemsAction();
        }
    }

    render() {
        const {
            items,
            isLoading,
            addToCartAction,
            currencySign,
        } = this.props;

        return (
            <Spin spinning={isLoading} size="large">
                <div className="main-page__container">
                    <ItemsList
                        items={items}
                        currencySign={currencySign}
                        onAddItem={addToCartAction}
                    />
                </div>
            </Spin>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      items: getItems(state),
      isLoading: getIsLoading(state),
      currencySign: getCurrencySign(state),
    };
  };
  
  const mapDispatchToProps = {
    loadItemsAction: loadItems,
    addToCartAction: addCartItem,
  };

export const MainPage = connect(mapStateToProps, mapDispatchToProps)(MainPageContainer);
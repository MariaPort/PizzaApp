import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
    Menu,
    PageHeader,
    Button,
    Badge,
    Select,
    Dropdown,
    Modal,
} from 'antd';
import {connect} from 'react-redux';
import {
    UserOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons';

import {
    USD,
    EUR,
    modalTypes,
} from '../../constants';
import {
    setCurrency,
    getCurrency,
    getCartItemsAmount,
    setModalType,
    getUser,
    resetUser,
    setUserFromStorage,
} from '../../store';

const LoginMenu = ({handleMenuClick}) => (
    <Menu onClick={handleMenuClick}>
        <Menu.Item key={modalTypes.LOGIN}>Login</Menu.Item>
        <Menu.Item key={modalTypes.REGISTRATION}>Registration</Menu.Item>
  </Menu>
);

const LogoutMenu = ({handleMenuClick}) => (
    <Menu onClick={handleMenuClick}>
        <Menu.Item key={modalTypes.LOGOUT}>Logout</Menu.Item>
    </Menu>
);


export class HeaderContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.setUserFromStorageAction();
    }
    
    onLoginClick({key}) {
        this.props.setModalTypeAction(key);
    }

    onLogoutClick() {
        Modal.confirm({
            title: 'Are you sure?',
            icon: <ExclamationCircleOutlined />,
            content: 'We will be miss you(',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                this.props.resetUserAction();
                this.props.setModalTypeAction(null);
            },
            onCancel: () => {
                this.props.setModalTypeAction(null);
            },
          });
    }

    render() {
        const {
            user,
            currency,
            currencyChangeAction,
            cartItemsAmount,
        } = this.props;

        return (
            <div>
                <PageHeader
                    ghost={false}
                    title={<Link to="/">PIZZA TO GO</Link>}
                    subTitle="Indulge yourself with just one piece"
                    extra={[
                        <Select key="1"
                            defaultValue={currency}
                            style={{ width: 75 }}
                            onChange={currencyChangeAction}
                        >
                            <Select.Option value={USD}>USD</Select.Option>
                            <Select.Option value={EUR}>EUR</Select.Option>
                        </Select>,
                        (user && (<Button key="2">
                            <Link to="/orders">Previous Orders</Link>
                        </Button>)),
                        <Dropdown 
                            overlay={
                                user 
                                ? <LogoutMenu handleMenuClick={this.onLogoutClick.bind(this)} />
                                : <LoginMenu handleMenuClick={this.onLoginClick.bind(this)} />
                            }
                            key="3"
                        >
                            <Button shape="circle" icon={<UserOutlined />} />
                        </Dropdown>,
                        <Badge count={cartItemsAmount} key="4">
                            <Button type="primary">
                                <Link to="/cart">Cart</Link>
                            </Button>
                        </Badge>,                        
                    ]}
                    >
                </PageHeader>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      currency: getCurrency(state),
      cartItemsAmount: getCartItemsAmount(state),
      user: getUser(state),
    };
  };
  
  const mapDispatchToProps = {
    currencyChangeAction: setCurrency,
    setModalTypeAction: setModalType,
    resetUserAction: resetUser,
    setUserFromStorageAction: setUserFromStorage,
  };

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
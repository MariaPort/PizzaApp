import * as React from 'react';
import {useDispatch} from 'react-redux';
import {
    Modal,
    Button,
    Form,
    Input,
} from 'antd';

import {modalTypes} from '../../constants';
import {
    registerUser,
    userLogin,
} from '../../store';

const emailValidationRules = [
    {
        type: 'email',
        message: 'The input is not valid E-mail!',
    },
    {
        required: true,
        message: 'Please input your E-mail!',
        whitespace: true,
    },
];

const passwordValidationRules = [
    {
        required: true,
        message: 'Please input your password!',
        whitespace: true,
    }
];

const confirmPasswordValidationRules = [
    {
        required: true,
        message: 'Please confirm your password!',
    },
    ({getFieldValue}) => ({
        validator(rule, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject('The two passwords that you entered do not match!');
        },
    }),
];

export const LoginForm = ({
    type,
    onClose,
}) => {
    const dispatch = useDispatch();

    const loginSubmit = React.useCallback((values) => {
        dispatch(userLogin(values));
        onClose();
    }, []);

    const registrationSubmit = React.useCallback(({email, password}) => {
        dispatch(registerUser({email, password}));
        onClose();
    }, []);

    const loginFormConfigMap = React.useMemo(() => ({
        [modalTypes.LOGIN]: {
            title: 'Login',
            onSubmit: loginSubmit,
        },
        [modalTypes.REGISTRATION]: {
            title: 'Registration',
            onSubmit: registrationSubmit,
        },
    }[type]), [type]);

    return (
        <>
            <Modal
                title={loginFormConfigMap.title}
                visible={true}
                onCancel={onClose}
                footer={null}
            >
                <Form
                    name={loginFormConfigMap.title}
                    onFinish={loginFormConfigMap.onSubmit}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={emailValidationRules}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={passwordValidationRules}
                    >
                        <Input.Password minLength={4} />
                    </Form.Item>

                    {type === modalTypes.REGISTRATION && (
                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={confirmPasswordValidationRules}
                        >
                            <Input.Password />
                        </Form.Item>
                    )}

                    <Form.Item>
                        <Button 
                            type="primary"
                            htmlType="submit"
                        >
                            {loginFormConfigMap.title}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
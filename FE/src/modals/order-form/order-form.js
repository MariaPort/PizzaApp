import * as React from 'react';
import {useDispatch} from 'react-redux';
import {
    Modal,
    Button,
    Form,
    Input,
    message,
} from 'antd';

import {sendOrder} from '../../store';

const requiredValidation = [
    {
        required: true,
        message: 'This field can not be empty',
        whitespace: true,
    },
];

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

const phoneValidationRules = [
    {
        required: true,
        message: 'Please enter your phone number',
    },
    ({getFieldValue}) => ({
        validator(rule, value) {
            const regExp = /^\d*$/;
            if (value && !regExp.test(value)) {
                return Promise.reject('Wrong format');
            }
            
            return Promise.resolve();
        },
    }),
];

export const OrderForm = ({onClose}) => {
    const dispatch = useDispatch();

    const handleSubmit = React.useCallback((values) => {
        dispatch(sendOrder(values));
        onClose();
    }, []);

    return (
        <>
            <Modal
                title="We will need some information"
                visible={true}
                onCancel={onClose}
                footer={null}
            >
                <Form
                    name="order"
                    onFinish={handleSubmit}
                >
                     <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={requiredValidation}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={requiredValidation}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={emailValidationRules}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Address"
                        name="address"
                        rules={requiredValidation}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={phoneValidationRules}
                    >
                        <Input
                            placeholder="900 999 99 99"
                            addonBefore="+7"
                            maxLength={10}
                            minLength={10}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button 
                            type="primary"
                            htmlType="submit"
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
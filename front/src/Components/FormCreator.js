import React from 'react'
import '../Styles/Form.css'
import { Form, Input, InputNumber, Button } from 'antd';
import { withRouter } from 'react-router-dom'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not validate email!',
        number: '${label} is not a validate number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const FormCreator = props => {

    const onFinish = values => {
        console.log(values);
    };

    const logout = () => {
        props.history.push("/")
    };

    return (
        <div className="form-container">
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'introduction']} label="Description" >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name={['user', 'age']} label="Score" rules={[{ type: 'number', min: 0, max: 10 }]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item name={['user', 'website']} label="Image">
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );

};

export default withRouter(FormCreator);

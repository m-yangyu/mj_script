import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '@/redux/Reducer/auth';
import {
  Form,
  Input,
  Checkbox,
  Button,
} from 'antd';
import './index.scss';


const mapDispatchToProps = (dispatch) => ({
  login: (config, success, fail) => dispatch(login(config, success, fail)),
});

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = (props) => {
  const history = useHistory();
  const onFinish = (values) => {
    props.login(
      // 可发送一个promise的http请求
      new Promise((resolve) => {
        resolve({ a: 111 });
      }),
      () => {
        console.log('登录成功', values);
        sessionStorage.setItem('token', '测试的token');
        history.push('/test');
      },
    );
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="components-form-demo-normal-login">
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="login-form"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout} className="login-form-button">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};


export default connect(
  null,
  mapDispatchToProps,
)(Login);

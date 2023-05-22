import React from 'react';
import { Form, Input, Button, Checkbox, Avatar } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect, FormattedMessage, useIntl } from 'umi';
import './index.less';

const Login = (props) => {
  const intl = useIntl();
  const onFinish = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values },
    });
  };

  return (
    <div className="login-form">
      <div className="login-form-shadow">
        <h1>登录</h1>
        <Form
          size="large"
          name="login"
          className="form"
          initialValues={{
            remember: true,
            userName: '',
            password: '',
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="userName"
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: 'login.p_userName',
                }),
              },
              {
                pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]{5,20}$/,
                message: intl.formatMessage({
                  id: 'login.p_userName_pattern',
                }),
              },
            ]}
          >
            <Input
              style={{
                color: '#000',
              }}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder={intl.formatMessage({
                id: 'login.p_userName',
              })}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: 'login.p_password',
                }),
              },
              {
                pattern: /^[A-Za-z0-9_]{6,20}$/,
                message: intl.formatMessage({
                  id: 'login.p_password_pattern',
                }),
              },
            ]}
          >
            <Input
              style={{
                color: '#000',
              }}
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder={intl.formatMessage({
                id: 'login.p_password',
              })}
            />
          </Form.Item>
          {/* <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>自动登录</Checkbox>
            </Form.Item>
          </Form.Item> */}

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              <FormattedMessage id="login.login" />
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);

import { Form, Input, Button, Space } from '@arco-design/web-react';
import { FormInstance } from '@arco-design/web-react/es/Form';
import { IconLock, IconUser } from '@arco-design/web-react/icon';
import React, { useRef, useState } from 'react';

import { useDispatch } from 'react-redux';
import styles from './style/index.module.less';
import history from '../../history';
import useLocale from '../../utils/useLocale';
import { login as adminLogin } from '../../api/login';

export default function LoginForm() {
  const formRef = useRef<FormInstance>();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const locale = useLocale();
  const dispatch = useDispatch();

  function afterLoginSuccess(params) {
    // 记录登录状态
    localStorage.setItem('token', params.token);
    dispatch({
      type: 'LOGIN',
      payload: params,
    });
    // 跳转首页
    window.location.href = history.createHref({
      pathname: '/',
    });
  }

  async function login(params) {
    setErrorMessage('');
    setLoading(true);
    try {
      const res = await adminLogin(params);
      console.log(res);
      if (res.data) {
        if ((res as any).code === 0) {
          afterLoginSuccess(res.data);
        }
      } else {
        setErrorMessage((res as any).msg);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  async function onSubmitClick() {
    formRef.current.validate().then((values) => {
      login(values);
    });
  }

  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>博客后台管理系统</div>
      <div className={styles['login-form-sub-title']}>登录博客后台管理系统</div>
      <div className={styles['login-form-error-msg']}>{errorMessage}</div>
      <Form className={styles['login-form']} layout="vertical" ref={formRef}>
        <Form.Item
          field="userName"
          rules={[
            { required: true, message: locale['login.p_userName'] },
            {
              match: /^[\u4E00-\u9FA5A-Za-z0-9_]{5,20}$/,
              message: locale['login.p_userName_pattern'],
            },
          ]}
        >
          <Input
            prefix={<IconUser />}
            placeholder={locale['login.p_userName']}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Form.Item
          field="password"
          rules={[
            { required: true, message: locale['login.p_password'] },
            {
              match: /^[A-Za-z0-9_]{6,20}$/,
              message: locale['login.p_password_pattern'],
            },
          ]}
        >
          <Input.Password
            prefix={<IconLock />}
            placeholder={locale['login.p_password']}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Space size={16} direction="vertical">
          {/* <div className={styles['login-form-password-actions']}>
            <Checkbox checked={rememberPassword} onChange={setRememberPassword}>
              记住密码
            </Checkbox>
            <Link>忘记密码？</Link>
          </div> */}
          <Button type="primary" long onClick={onSubmitClick} loading={loading}>
            {locale['login.login']}
          </Button>
          {/* <Button type="text" long className={styles['login-form-register-btn']}>
            注册账号
          </Button> */}
        </Space>
      </Form>
    </div>
  );
}

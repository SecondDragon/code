import { useState } from 'react';
import * as md5 from 'md5';
import { Button, Form, Input } from 'antd-mobile';
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { AUTH_TOKEN } from '@/utils/constants';
import { STUDENT_LOGIN } from '../../graphql/user';
import { showFail, showSuccess } from '../../utils';

import style from './index.module.less';

interface IValue {
  password: string;
  account: string;
}

/**
* 登录页面
*/
const Login = () => {
  const [visible, setVisible] = useState(false);
  const [login, { loading }] = useMutation(STUDENT_LOGIN);
  const nav = useNavigate();

  const loginHandler = async (values: IValue) => {
    const res = await login({
      variables: {
        password: md5(values.password),
        account: values.account,
      },
    });

    if (res.data.studentLogin.code === 200) {
      showSuccess(res.data.studentLogin.message);
      localStorage.setItem(AUTH_TOKEN, res.data.studentLogin.data);
      nav('/');
      return;
    }
    const data = res.data.studentLogin;
    showFail(data);
  };
  return (
    <div className={style.container}>
      <div className={style.logo}>
        <img src="https://water-drop-assets.oss-cn-hangzhou.aliyuncs.com/images/henglogo.png" alt="" />
      </div>
      <Form
        layout="horizontal"
        onFinish={loginHandler}
        footer={(
          <Button loading={loading} block type="submit" color="primary" size="large">
            登录
          </Button>
        )}
      >
        <Form.Item
          label="用户名"
          name="account"
          rules={[{
            required: true,
            message: '用户名不能为空',
          }, {
            pattern: /^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,10}$/,
            message: '有且只能包含小写字母和数字，长度大于 6，小于 10',
          }]}
        >
          <Input placeholder="请输入用户名" clearable />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{
            required: true,
            message: '密码不能为空',
          }, {
            pattern: /^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,}$/,
            message: '有且只能包含小写字母和数字，长度大于 6',
          }]}
          extra={(
            <div className={style.eye}>
              {!visible ? (
                <EyeInvisibleOutline onClick={() => setVisible(true)} />
              ) : (
                <EyeOutline onClick={() => setVisible(false)} />
              )}
            </div>
            )}
        >
          <Input
            placeholder="请输入密码"
            clearable
            type={visible ? 'text' : 'password'}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;

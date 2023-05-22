import {
  Button, Form, Input,
} from 'antd-mobile';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import * as md5 from 'md5';
import { STUDENT_REGISTER } from '../../graphql/user';
import { showFail, showSuccess } from '../../utils';
import style from './index.module.less';

interface IValue {
  password: string;
  account: string;
}
/**
* 注册
*/
const Register = () => {
  const [form] = Form.useForm();
  const [register, { loading }] = useMutation(STUDENT_REGISTER);
  const nav = useNavigate();

  const onRegisterHandler = async (values: IValue) => {
    const res = await register({
      variables: {
        password: md5(values.password),
        account: values.account,
      },
    });
    if (res.data.studentRegister.code === 200) {
      showSuccess(res.data.studentRegister.message);
      nav('/login');
      return;
    }
    const data = res.data.studentRegister;
    showFail(data);
  };
  return (
    <div className={style.container}>
      <div className={style.logo}>
        <img src="https://water-drop-assets.oss-cn-hangzhou.aliyuncs.com/images/henglogo.png" alt="" />
      </div>
      <Form
        form={form}
        layout="horizontal"
        onFinish={onRegisterHandler}
        footer={(
          <Button loading={loading} block type="submit" color="primary" size="large">
            注册
          </Button>
        )}
      >
        <Form.Item
          rules={[{
            required: true,
            message: '用户名不能为空',
          }, {
            pattern: /^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,10}$/,
            message: '有且只能包含小写字母和数字，长度大于 6，小于 10',
          }]}
          label="用户名"
          name="account"
        >
          <Input placeholder="请输入用户名" clearable />
        </Form.Item>
        <Form.Item
          label="输入密码"
          name="password"
          rules={[{
            required: true,
            message: '密码不能为空',
          }, {
            pattern: /^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,}$/,
            message: '有且只能包含小写字母和数字，长度大于 6',
          }]}
        >
          <Input
            placeholder="请输入密码"
            clearable
            type="password"
          />
        </Form.Item>
        <Form.Item
          rules={[{
            required: true,
            message: '密码不能为空',
          }, {
            pattern: /^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,}$/,
            message: '有且只能包含小写字母和数字，长度大于 6',
          }, {
            validator: (_, value) => {
              const password = form.getFieldValue('password');
              if (password === value) {
                return Promise.resolve();
              }
              return Promise.reject();
            },
            message: '两次输入的密码需要一致',
          }]}
          label="确认密码"
          name="passwordConfirm"
        >
          <Input
            placeholder="请再次输入密码"
            clearable
            type="password"
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;

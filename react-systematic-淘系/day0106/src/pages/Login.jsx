import React, { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { history, useSearchParams, useModel, Helmet } from '@umijs/max';
import { message, Tabs } from 'antd';
import styled from 'styled-components';
import Footer from '@/components/Footer';
import BASE_API from '@/services/base';
import md5 from 'blueimp-md5';
import _ from '@/assets/utils';

/* 组件样式 */
const StyledLoginBox = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
    background-image: url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr');
    background-size: 100% 100%;
    .form-box{
        flex: 1;
        padding: 32px 0;
    }
    .remember{
        margin-bottom: 24px;
    }
    .ant-pro-form-login-main{
        min-width: 280px;
        max-width: 75vw;
    }
`;

let passwordMD5 = '';
const Login = function Login() {
    /* 定义需要的状态 */
    // 控制选项卡切换
    const [type, setType] = useState('account');
    // 获取初始状态「公共」
    const { initialState, setInitialState } = useModel('@@initialState');
    // 解析传递的问号参数
    const [usp] = useSearchParams();

    /* 组件第一次渲染 */
    let formIns = useRef(),
        char = '······';
    useEffect(() => {
        let remember = _.storage.get('remember');
        if (!remember) return;
        let { account, password } = remember;
        formIns.current.setFieldsValue({
            account,
            password: char
        });
        passwordMD5 = password;
    }, []);

    /* 登录提交 */
    const submit = async (values) => {
        let { account, password, autoLogin } = values;
        if (password === char) {
            password = passwordMD5;
        } else {
            password = md5(password);
        }

        try {
            let { resultCode, data } = await BASE_API.adminUserLogin(account, password);
            if (+resultCode !== 200) {
                message.error('很遗憾，登录失败，请稍后再试~');
                return;
            }
            // 登录成功：@1 存储Token信息
            _.storage.set('tk', data);
            // 登录成功：@2 获取登录者信息，存储到@@initialState中
            let profile = await BASE_API.adminUserProfile();
            if (+profile.resultCode !== 200) {
                message.error('获取登录者信息失败，请稍后再试~');
                return;
            }
            flushSync(() => {
                // 只有立即更新状态后，才能进行后续的步骤
                setInitialState({
                    ...initialState,
                    currentUser: profile.data
                });
            });
            // 登录成功：@3 存储账号和密码
            if (autoLogin) {
                _.storage.set('remember', {
                    account,
                    password
                });
            } else {
                _.storage.remove('remember');
            }
            // 登录成功：@4 提示和跳转
            message.success('恭喜您，登录成功啦~');
            let to = usp.get('to');
            to ? history.replace(to) : history.push('/');
        } catch (_) { }
    };

    return <StyledLoginBox>
        {/* 设置页面的标题 */}
        <Helmet>
            <title>用户登录-CMS内容管理系统</title>
        </Helmet>

        {/* 表单区域 */}
        <div className='form-box'>
            <LoginForm
                title="CMS管理系统"
                subTitle="请务必保护好您的账号密码，防止信息泄漏！"
                logo={<img alt="logo" src="/logo.svg" />}
                initialValues={{
                    autoLogin: true,
                    account: '',
                    password: ''
                }}
                onFinish={submit}
                formRef={formIns}
            >
                <Tabs
                    activeKey={type}
                    onChange={setType}
                    centered
                    items={[
                        { key: 'account', label: '账户密码登录' },
                        { key: 'mobile', label: '手机号登录', disabled: true }
                    ]}
                />

                {/* 账号密码登录 */}
                {type === 'account' && (
                    <>
                        <ProFormText
                            name="account"
                            placeholder="请输入账号"
                            fieldProps={{
                                size: 'large',
                                prefix: <UserOutlined />
                            }}
                            rules={[
                                { required: true, message: "账号不能为空哦~" }
                            ]}
                        />
                        <ProFormText.Password
                            name="password"
                            placeholder="请输入密码"
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined />,
                            }}
                            rules={[
                                { required: true, message: "密码不能为空哦~" }
                            ]}
                        />
                    </>
                )}

                {/* 手机验证码登录 */}
                {type === 'mobile' && (
                    <>
                        <ProFormText
                            name="account"
                            placeholder="请输入手机号"
                            fieldProps={{
                                size: 'large',
                                prefix: <MobileOutlined />,
                            }}
                            rules={[
                                { required: true, message: '手机号不能为空哦~' },
                                { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '手机号格式不正确哈~' }
                            ]}
                        />
                        <ProFormCaptcha
                            name="password"
                            phoneName="account"
                            placeholder="请输入验证码"
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined />,
                            }}
                            captchaProps={{ size: 'large' }}
                            captchaTextRender={(timing, count) => {
                                if (timing) return `${count} 获取验证码`;
                                return '获取验证码';
                            }}
                            onGetCaptcha={async (phone) => {
                                // 向服务器发送请求获取验证码
                            }}
                            rules={[
                                { required: true, message: '验证码不能为空哦~' },
                                { pattern: /^\d{6}$/, message: '验证码格式不正确哈~' }
                            ]}
                        />
                    </>
                )}

                <div className='remember'>
                    <ProFormCheckbox name="autoLogin">记住账号/密码</ProFormCheckbox>
                </div>
            </LoginForm>
        </div>

        {/* 尾部 */}
        <Footer />
    </StyledLoginBox>;
};
export default Login;
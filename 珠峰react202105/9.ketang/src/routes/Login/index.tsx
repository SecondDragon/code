import React, { PropsWithChildren } from 'react';
import { RouteComponentProps } from 'react-router-dom'
import NavHeader from '@/components/NavHeader'
import { Form, Input, message, Button } from 'antd';
import { connect } from 'react-redux';
import actions from '@/store/actions/profile';
import { CombinedState } from '@/store/reducers';
import { ProfileState } from '@/store/reducers/profile';
import { Link } from 'react-router-dom';
import './index.less';
import { LockOutlined, MailOutlined, UserAddOutlined } from '_@ant-design_icons@4.6.2@@ant-design/icons';
type stateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof actions;
interface Params { }
type Props = PropsWithChildren<RouteComponentProps<Params> & stateProps & DispatchProps>;
function Login(props: Props) {
    const onFinish = (values: any) => {
        props.login(values);
    }
    const onFinishFailed = (errorInfo: any) => {
        message.error('表单验证失败' + errorInfo);
    }
    return (
        <>
            <NavHeader history={props.history}>用户登录</NavHeader>
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="login-form"
            >
                <Form.Item label="用户名" name="username" rules={[{ required: true, message: '用户名必须输入' }]}>
                    <Input placeholder="用户名" prefix={<UserAddOutlined />} />
                </Form.Item>
                <Form.Item label="密码" name="password" rules={[{ required: true, message: '密码必须输入' }]}>
                    <Input placeholder="密码" prefix={<LockOutlined />} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-submit">登录</Button>
                    或者<Link to="/register">注册</Link>
                </Form.Item>
            </Form>
        </>

    )
}
function mapStateToProps(state: CombinedState): ProfileState {
    return state.profile;
}
export default connect(
    mapStateToProps,
    actions
)(Login);
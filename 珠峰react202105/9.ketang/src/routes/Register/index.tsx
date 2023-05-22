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
function Register(props: Props) {
    const onFinish = (values: any) => {
        props.register(values);
    }
    const onFinishFailed = (errorInfo: any) => {
        message.error('表单验证失败' + errorInfo);
    }
    return (
        <>
            <NavHeader history={props.history}>用户注册</NavHeader>
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="register-form"
            >
                <Form.Item label="用户名" name="username" rules={[{ required: true, message: '用户名必须输入' }]}>
                    <Input placeholder="用户名" prefix={<UserAddOutlined />} />
                </Form.Item>
                <Form.Item label="密码" name="password" rules={[{ required: true, message: '密码必须输入' }]}>
                    <Input placeholder="密码" prefix={<LockOutlined />} />
                </Form.Item>
                <Form.Item label="确定密码" name="confirmPassword" rules={[{ required: true, message: '确定密码必须输入' }]}>
                    <Input placeholder="确定密码" prefix={<LockOutlined />} />
                </Form.Item>
                <Form.Item label="邮箱" name="email" rules={[{ required: true, message: '邮箱必须输入' }]}>
                    <Input placeholder="邮箱" prefix={<MailOutlined />} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="register-submit">注册</Button>
                    或者<Link to="/login">登录</Link>
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
)(Register);
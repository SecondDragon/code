import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history, useModel } from '@umijs/max';
import { Avatar, Spin } from 'antd';
import { setAlpha } from '@ant-design/pro-components';
import React, { useCallback } from 'react';
import HeaderDropdown from '../HeaderDropdown';
import { message } from 'antd';

/* 用户名 */
const Name = () => {
  const { initialState } = useModel('@@initialState'),
    currentUser = initialState?.currentUser;

  // 组件样式
  const nameClassName = useEmotionCss(({ token }) => {
    return {
      width: '70px',
      height: '48px',
      overflow: 'hidden',
      lineHeight: '48px',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      [`@media only screen and (max-width: ${token.screenMD}px)`]: {
        display: 'none'
      }
    };
  });

  return <span className={`${nameClassName} anticon`}>
    {currentUser?.name}
  </span>;
};

/* 头像 */
const AvatarLogo = () => {
  const { initialState } = useModel('@@initialState'),
    currentUser = initialState?.currentUser;

  // 组件样式
  const avatarClassName = useEmotionCss(({ token }) => {
    return {
      marginRight: '8px',
      color: token.colorPrimary,
      verticalAlign: 'top',
      background: setAlpha(token.colorBgContainer, 0.85),
      [`@media only screen and (max-width: ${token.screenMD}px)`]: {
        margin: 0,
      },
    };
  });

  return <Avatar size="small" alt="avatar"
    className={avatarClassName}
    src={currentUser?.avatar} />;
};

const AvatarDropdown = function AvatarDropdown() {
  /* 组件样式 */
  const actionClassName = useEmotionCss(({ token }) => {
    return {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover
      }
    };
  });

  /* 登录信息处理 */
  const loading = (
    <span className={actionClassName}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );
  const { initialState, setInitialState } = useModel('@@initialState'),
    currentUser = initialState?.currentUser;
  if (!currentUser) return loading;

  /* MENU处理 */
  const menuItems = [{
    key: 'center',
    icon: <UserOutlined />,
    label: '个人中心',
    disabled: true
  }, {
    key: 'settings',
    icon: <SettingOutlined />,
    label: '个人设置',
    disabled: true
  }, {
    type: 'divider'
  }, {
    key: 'logout',
    icon: <LogoutOutlined />,
    label: '退出登录'
  }];
  const onMenuClick = useCallback(
    ({ key }) => {
      if (key === 'logout') {
        // 退出登录
        setInitialState({
          // 去掉了currentUser
          settings: initialState.settings
        });
        message.success('您已安全退出');
        history.replace({
          pathname: '/login',
          query: {
            to: history.location.pathname
          }
        });
        return;
      }
      // 点击其它
    },
    [setInitialState]
  );

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems
      }}
    >
      <span className={actionClassName}>
        <AvatarLogo />
        <Name />
      </span>
    </HeaderDropdown>
  );
};
export default AvatarDropdown;
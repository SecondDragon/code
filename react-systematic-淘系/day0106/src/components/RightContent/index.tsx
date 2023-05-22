import { QuestionCircleOutlined } from '@ant-design/icons';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useModel } from '@umijs/max';
import React from 'react';
import Avatar from './AvatarDropdown';

const GlobalHeaderRight = function GlobalHeaderRight() {
  /* 组件的样式 */
  const className = useEmotionCss(() => {
    return {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      gap: 8
    };
  });
  const actionClassName = useEmotionCss(({ token }) => {
    return {
      display: 'flex',
      float: 'right',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      cursor: 'pointer',
      padding: '0 12px',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover
      }
    };
  });

  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) return null;

  return (
    <div className={className}>
      {/* 问号 */}
      <span className={actionClassName}
        onClick={() => { }}>
        <QuestionCircleOutlined />
      </span>

      {/* 用户名和头像 */}
      <Avatar />
    </div>
  );
};
export default GlobalHeaderRight;
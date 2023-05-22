import React from 'react';
import { SettingDrawer } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { message } from 'antd';
import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import defaultSettings from '../config/defaultSettings';
import _ from '@/assets/utils';
import BASE_API from '@/services/base';
const loginPath = '/login';

/**
 * @name 给initialState赋值
 * @see https://umijs.org/zh-CN/plugins/plugin-initial-state
 */
export const getInitialState = async () => {
  // 页面加载时，只要跳转的不是登录页，我们都需要从服务器获取登录者信息，存放到initialState.currentUser中，以此来处理后续的登录态校验！！ => 如果没有登录，则直接跳转到登录页！！
  const { location } = history;
  if (location.pathname !== loginPath) {
    try {
      let { resultCode, data } = await BASE_API.adminUserProfile();
      if (+resultCode === 200) {
        // 已经成功获取登录者信息
        return {
          currentUser: data,
          settings: defaultSettings
        };
      }
    } catch (_) { }
    // 没有登录:获取数据失败；获取到数据了、但是没有登录者信息...
    message.error('您还未登录，请您先登录~');
    history.replace({
      pathname: loginPath,
      query: {
        to: location.pathname
      }
    });
  }
  return {
    settings: defaultSettings
  };
};

/**
 * @name ProLayout支持的API
 * @doc https://procomponents.ant.design/components/layout
 */
export const layout = ({ initialState, setInitialState }) => {
  return {
    // 头部导航右侧内容渲染
    rightContentRender: () => <RightContent />,
    // 尾部内容的渲染
    footerRender: () => <Footer />,
    // 路由切换时触发
    onPageChange: () => {
      const { location } = history;
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        // 没登录则跳转到登录页
        message.error('您还未登录，请您先登录~');
        history.replace({
          pathname: loginPath,
          query: {
            to: location.pathname
          }
        });
      }
    },
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 右侧切换主题的按钮
    childrenRender: (children) => {
      return (
        <>
          {children}
          <SettingDrawer
            disableUrlParams
            enableDarkTheme
            settings={initialState?.settings}
            onSettingChange={(settings) => {
              // 当主题改变「settings最新配置项」，我们需要修改initialState.settings
              setInitialState((prevInitialState) => {
                return {
                  ...prevInitialState,
                  settings
                };
              });
            }}
          />
        </>
      );
    },
    // 其余的配置项
    ...initialState?.settings
  };
};

/**
 * @name 对Axios的配置 
 * @description 包含请求拦截器、响应拦截器、错误的统一处理等
 * @doc https://umijs.org/docs/max/request
 */
export const request = {
  // 基础配置
  timeout: 60000,
  // other axios options you want
  // 错误统一处理
  errorConfig: {
    errorHandler() {
      message.error('网络繁忙，请您稍后再试~~');
    }
  },
  // 请求拦截器
  requestInterceptors: [
    (config) => {
      const token = _.storage.get('tk');
      if (token && config.url !== "/api/adminUser/login") {
        config.headers['token'] = token;
      }
      return config;
    }
  ],
  // 响应拦截器
  responseInterceptors: [
    (response) => {
      return response;
    }
  ]
};
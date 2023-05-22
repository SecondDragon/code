import { history, Helmet } from '@umijs/max';
import { Button, Result } from 'antd';
import React from 'react';

const NoFoundPage = function NoFoundPage() {
  return <>
    <Helmet>
      <title>404 - CMS内容管理系统</title>
    </Helmet>

    <Result
      status="404"
      title="404"
      subTitle="很遗憾，您访问的页面不存在呀~"
      extra={
        <Button type="primary"
          onClick={() => history.push('/')}>
          返回首页
        </Button>
      }
    />
  </>;
};
export default NoFoundPage;
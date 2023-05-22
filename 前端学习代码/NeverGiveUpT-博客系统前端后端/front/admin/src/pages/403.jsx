import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';

const NoAuth = () => (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you do not have permission to access this page."
  />
);

export default NoAuth;

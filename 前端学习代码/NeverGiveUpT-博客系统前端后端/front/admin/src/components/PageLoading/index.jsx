// import { PageLoading } from '@ant-design/pro-layout'; // loading components from code split
// https://umijs.org/plugin/umi-plugin-react.html#dynamicimport

import { Spin } from 'antd';
const PageLoading = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        textAlign: 'center',
        position: 'absolute',
        top: '50%',
      }}
    >
      <Spin size="large" />
    </div>
  );
};
export default PageLoading;

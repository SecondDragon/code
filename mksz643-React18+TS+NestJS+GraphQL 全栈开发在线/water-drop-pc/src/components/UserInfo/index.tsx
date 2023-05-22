import { IPropChild } from '@/utils/types';
import { connect, useGetUser } from '@/hooks/userHooks';
import { Spin } from 'antd';

/**
* 获取用户信息组件
*/
const UserInfo = ({ children }: IPropChild) => {
  const { loading } = useGetUser();
  return (
    <Spin spinning={loading}>
      <div style={{ height: '100vh' }}>
        {children}
      </div>
    </Spin>
  );
};

export default connect(UserInfo);

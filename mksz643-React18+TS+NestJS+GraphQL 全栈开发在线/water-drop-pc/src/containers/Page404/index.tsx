import { Button, Result } from 'antd';

/**
* 404
*/
const Page404 = () => (
  <Result
    status="404"
    title="404"
    subTitle="您访问的页面不存在"
    extra={<Button type="primary" href="/">返回首页</Button>}
  />
);

export default Page404;

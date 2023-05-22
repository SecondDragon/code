import { useUserContext } from '@/hooks/userHooks';
import { Button } from 'antd';
import { useGoTo } from '@/hooks';
import { ROUTE_KEY } from '@/routes/menus';
import style from './index.module.less';

/**
*
*/
const Home = () => {
  const { store } = useUserContext();
  const { go } = useGoTo();
  return (
    <div className={style.container}>
      <Button onClick={() => go(ROUTE_KEY.MY)}>
        去个人中心
        {store.currentOrg}
      </Button>
    </div>
  );
};

export default Home;

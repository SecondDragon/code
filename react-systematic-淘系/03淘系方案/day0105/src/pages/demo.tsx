import { useParams, withRouter } from 'umi';

const DemoPage = ({ match }) => {
  // 方案二：基于withRouter处理组件，这样组件的属性中包含 history/location/match 三个对象，其中match.params匹配的就是路径参数！！ => v5
  console.log(match.params);
  return (
    <div>
      测试页
    </div>
  );
};
export default withRouter(DemoPage);

/* const DemoPage = () => {
  // 方案一：基于路由Hook处理   => v6
  let params = useParams();
  console.log(params);

  return (
    <div>
      测试页
    </div>
  );
};
export default DemoPage; */
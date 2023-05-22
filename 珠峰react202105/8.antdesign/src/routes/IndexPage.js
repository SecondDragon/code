import React from 'react';
import { connect } from 'dva';
import {Layout} from 'antd';
import NavBar from '../components/NavBar';
import {Switch} from 'dva/router';
import { renderRoutes,renderRedirect } from '../utils/routes';
let {Content} = Layout;

function IndexPage(props) {
  return (
    <Layout>
      <NavBar {...props}/>
      <Content>
        <Switch>
          {renderRoutes(props.routes)}
          {renderRedirect('/',true,props.routes)}
        </Switch>
      </Content>
    </Layout>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);

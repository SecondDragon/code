import React from 'react';
import { Router, Switch } from 'dva/router';
import routesConfig from './routesConfig';
import {renderRoutes} from './utils/routes';
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        {renderRoutes(routesConfig)}
      </Switch>
    </Router>
  );
}

export default RouterConfig;

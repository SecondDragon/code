/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import React from 'react';
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import { Avatar } from 'antd';
import { Link, useIntl, connect, FormattedMessage } from 'umi';
import avatar from '@/assets/mine.jpeg';

import RightContent from '@/components/GlobalHeader/RightContent';
import logo from '../assets/logo.svg';

/**
 * use Authorized check all menu item
 */
const menuDataRender = (menuList) => { 
  console.log("menuList", menuList);
 let a= menuList.map((item) => {
    
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    };
    return localItem;
  });
  console.log("menuList:--------------", a);
  return a
}
  

const defaultFooterDom = (
  <DefaultFooter
    copyright={`${new Date().getFullYear()} NeverGiveUpT`}
    links={[
      {
        key: 'desc',
        title: <FormattedMessage id="component.layout.footer" />,
      },
    ]}
  />
);

const BasicLayout = (props) => {
  const { dispatch, children, settings, collapsed } = props;

  console.log();
  /**
   * constructor
   */

  /**
   * init variables
   */

  const handleMenuCollapse = (payload) => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  const { formatMessage } = useIntl();
  return (
    <ProLayout
      logo={logo}
      formatMessage={formatMessage}
      menuHeaderRender={(logoDom, titleDom) => (
        <Link to="/">
          <Avatar size="large" src={avatar} />
          {!collapsed && (
            <span
              style={{
                fontSize: 18,
                marginLeft: 10,
              }}
            >
              <FormattedMessage id="common.blog.manager" />
            </span>
          )}
        </Link>
      )}
      onCollapse={handleMenuCollapse}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || !menuItemProps.path) {
          return defaultDom;
        }

        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: formatMessage({
            id: 'menu.home',
          }),
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      footerRender={() => defaultFooterDom}
      menuDataRender={menuDataRender}
      rightContentRender={() => <RightContent />}
      {...props}
      {...settings}
    >
      {children}
    </ProLayout>
  );
};

export default connect(({ global, settings }) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);

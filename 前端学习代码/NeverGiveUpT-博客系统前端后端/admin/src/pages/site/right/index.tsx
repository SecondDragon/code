import React, { useState } from 'react';
import {
  Breadcrumb,
  Card,
  Tabs
} from '@arco-design/web-react';
import styles from './style/index.module.less';

import Tab0 from './components/tab0';
import Tab1 from './components/tab1';
import Tab3 from './components/tab3';




const HeaderFooter = () => {
  const [key, setKey] = useState('0');
  const onTabChange = (key) => {
    setKey(key)
  }

  return <>
    <div className={styles.container}>
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>侧栏配置</Breadcrumb.Item>
      </Breadcrumb>

      <Card hoverable>
        <Tabs activeTab={key} onChange={onTabChange}>

          <Tabs.TabPane key='0' title='个人简介'>
            {
              key == '0' && <Tab0 />
            }
          </Tabs.TabPane>
          <Tabs.TabPane key='1' title='广告设置'>
            {
              key == '1' && <Tab1 />
            }
          </Tabs.TabPane>
          <Tabs.TabPane key='2' title='推荐设置'>
            {
              key == '2' && <Tab3 />
            }
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  </>
}

export default HeaderFooter;
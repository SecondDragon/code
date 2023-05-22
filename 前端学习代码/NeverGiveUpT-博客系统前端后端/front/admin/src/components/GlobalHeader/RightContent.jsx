// import { SettingDrawer } from '@ant-design/pro-layout';
// import proSettings from '../../../config/defaultSettings';
import React from 'react';
import { connect } from 'umi';
import Avatar from './AvatarDropdown';
import SelectLang from '../SelectLang';
import styles from './index.less';

const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight = (props) => {
  const { theme, layout } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <Avatar />
      <SelectLang className={styles.action} />
      {/* <SettingDrawer settings={proSettings} /> */}
    </div>
  );
};

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);

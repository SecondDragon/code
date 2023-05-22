import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer = function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{ background: 'none' }}
      copyright={`${currentYear} 珠峰培训课堂案例「不作为商用」`}
      links={[{
        key: '珠峰培训',
        title: '珠峰培训',
        href: 'https://www.zhufengpeixun.cn/',
        blankTarget: true
      }, {
        key: '视频平台',
        title: "视频平台",
        href: 'https://www.javascriptpeixun.cn/',
        blankTarget: true
      }, {
        key: '开源信息',
        title: '开源信息',
        href: 'https://github.com/newbee-ltd',
        blankTarget: true
      }]}
    />
  );
};
export default Footer;
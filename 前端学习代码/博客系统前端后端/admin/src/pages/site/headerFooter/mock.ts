import Mock from 'mockjs';

import setupMock from '../../../utils/setupMock'


const data = {
  "createTime":1598256096,
  "updateTime":1619316747,
  "_id":"5f4373e094c942f8bc6daa6a",
  "header":{
      "openSearch":true,
      "login":true,
      "register":true,
      "_id":"5f4373e094c942f8bc6daa6b",
      "logo":"",
      "title":"NeverGiveUpT"
  },
  "footer":{
      "_id":"5f4373e094c942f8bc6daa72",
      "copyright":"Copyright © 2020 NeverGiveUpT・蜀ICP备2020026338号",
      "extra":"本系统由Vue+Muse-UI提供技术支持"
  }
}

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/v1/config/hf'), (params) => {
      console.log('---', params);

      switch (params.type) {

        case 'PUT':
          const body = JSON.parse(params.body);
          return {
            "msg": "Header/Footer配置信息修改成功",
            "data": body,
            "code": 0
          }
        case 'POST':
          const postBody = JSON.parse(params.body);
          return {
            "msg": "Header/Footer配置信息添加成功",
            "code": 0,
            data: postBody
          }
        case 'GET':
        default:
          return {
            msg: "Header/Footer配置信息获取成功",
            code: 0,
            data
          }
      }



    });
  },
});

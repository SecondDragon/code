import Mock from 'mockjs';

import setupMock from '../../../utils/setupMock'


const data = {
  "effects":true,
  "createTime":1598256269,
  "updateTime":1619316645,
  "_id":"5f43748d94c942f8bc6daa87",
  "avatarRotate":false,
  "introduction":"There is a kind of call to eat together.",
  "homeBgImg":"http://nevergiveupt.top/index.jpg",
  "archiveBgImg":"http://nevergiveupt.top/archive.jpg",
  "categoriesBgImg":"http://nevergiveupt.top/category.jpg",
  "categoriesDetailBgImg":"http://nevergiveupt.top/category.jpg",
  "tagsBgImg":"http://nevergiveupt.top/tags.jpg",
  "tagsDetailBgImg":"http://nevergiveupt.top/tags.jpg",
  "aboutBgImg":"http://nevergiveupt.top/about.jpg",
  "avatar":"http://img.nevergiveupt.top/d962de99454167348513dd191fe20698.jpeg"
}

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/v1/config/home'), (params) => {
      console.log('---', params);

      switch (params.type) {

        case 'PUT':
          const body = JSON.parse(params.body);
          return {
            "msg": "首页配置修改成功",
            "data": body,
            "code": 0
          }
        case 'POST':
          const postBody = JSON.parse(params.body);
          return {
            "msg": "首页配置添加成功",
            "code": 0,
            data: postBody
          }
        case 'GET':
        default:
          return {
            msg: "首页配置获取成功",
            code: 0,
            data
          }
      }



    });
  },
});

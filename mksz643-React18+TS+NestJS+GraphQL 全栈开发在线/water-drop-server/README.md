水滴 后端服务

## 图片上传服务端文档
简单介绍：https://help.aliyun.com/document_detail/31926.html
Nodejs 代码：https://help.aliyun.com/document_detail/322691.htm?spm=a2c4g.11186623.0.0.1607566aUI6l0V#task-2121074

## 发送短信的阿里云文档
https://dysms.console.aliyun.com/quickstart

## 接口规范
返回数据的接口规范：

```json
{
  code: 200, // 10001 10002
  data: [], // {}
  message: 'error',
  page: {
    start: 0,
    length: 20,
    total: 100,
  },
  debug: '',
  key: '',
}
```
## 使用 JWT 保存登录状态
> 相关文档：https://docs.nestjs.com/security/authentication
1 pnpm i @nestjs/jwt @nestjs/passport passport-jwt passport -S
2 注册 JwtModule
3 添加自定义 JWT 策略
4 创建 Guard，引入 JWT 策略
5 修改登录接口
6 PC 端页面获取 JWT
import Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
import * as OpenApi from '@alicloud/openapi-client';
import { ACCESS_KEY, ACCESS_KEY_SECRET } from '@/common/constants/aliyun';

const config = new OpenApi.Config({
  // 必填，您的 AccessKey ID
  accessKeyId: ACCESS_KEY,
  // 必填，您的 AccessKey Secret
  accessKeySecret: ACCESS_KEY_SECRET,
});
// 访问的域名
config.endpoint = 'dysmsapi.aliyuncs.com';
export const msgClient = new Dysmsapi20170525(config);

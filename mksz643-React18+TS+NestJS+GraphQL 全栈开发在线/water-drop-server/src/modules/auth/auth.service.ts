import { Injectable } from '@nestjs/common';
import * as Dysmsapi from '@alicloud/dysmsapi20170525';
import Util, * as utils from '@alicloud/tea-util';
import { getRandomCode } from '@/shared/utils';
import { SIGN_NAME, TEMPLATE_CODE } from '@/common/constants/aliyun';
import { UserService } from './../user/user.service';
import { msgClient } from '@/shared/utils/msg';
import * as dayjs from 'dayjs';
import { Result } from '@/common/dto/result.type';
import {
  CODE_NOT_EXPIRE,
  CODE_SEND_ERROR,
  SUCCESS,
  UPDATE_ERROR,
} from '@/common/constants/code';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  // 发送短信验证码
  async sendCodeMsg(tel: string): Promise<Result> {
    const user = await this.userService.findByTel(tel);
    if (user) {
      const diffTime = dayjs().diff(dayjs(user.codeCreateTimeAt));
      if (diffTime < 60 * 1000) {
        return {
          code: CODE_NOT_EXPIRE,
          message: 'code 尚未过期',
        };
      }
    }
    const code = getRandomCode();
    const sendSmsRequest = new Dysmsapi.SendSmsRequest({
      signName: SIGN_NAME,
      templateCode: TEMPLATE_CODE,
      phoneNumbers: tel,
      templateParam: `{\"code\":\"${code}\"}`,
    });
    const runtime = new utils.RuntimeOptions({});
    try {
      const sendRes = await msgClient.sendSmsWithOptions(
        sendSmsRequest,
        runtime,
      );
      if (sendRes.body.code !== 'OK') {
        return {
          code: CODE_SEND_ERROR,
          message: sendRes.body.message,
        };
      }
      if (user) {
        const result = await this.userService.updateCode(user.id, code);
        if (result) {
          return {
            code: SUCCESS,
            message: '获取验证码成功',
          };
        }
        return {
          code: UPDATE_ERROR,
          message: '更新 code 失败',
        };
      }
      const result = await this.userService.create({
        tel,
        code,
        codeCreateTimeAt: new Date(),
      });
      if (result) {
        return {
          code: SUCCESS,
          message: '获取验证码成功',
        };
      }
      return {
        code: UPDATE_ERROR,
        message: '新建账号失败',
      };
    } catch (error) {
      // 如有需要，请打印 error
      Util.assertAsString(error.message);
    }
  }
}

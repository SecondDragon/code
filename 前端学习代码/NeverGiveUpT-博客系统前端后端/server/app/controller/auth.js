const Controller = require("egg").Controller;
const coWeChat = require("co-wechat");
const config = require("../../config/config.user");
class AuthController extends Controller {
  constructor(ctx) {
    super(ctx);
  }
  async index() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    await service.auth.index(data);
  }
  async signature() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    const res = await service.auth.signature(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async replay() {
    const { ctx, service } = this;
    const res = await service.auth.replay();
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async createMenu() {
    const { ctx, service } = this;
    const res = await service.auth.createMenu();
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async removeMenu() {
    const { ctx, service } = this;
    const res = await service.auth.removeMenu();
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async uploadMedia() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    const res = await service.auth.uploadMedia(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async getMedia() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    const res = await service.auth.getMedia(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async uploadMaterial() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    const res = await service.auth.uploadMaterial(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async uploadVideoMaterial() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    const res = await service.auth.uploadVideoMaterial(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async uploadNewsMaterial() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const res = await service.auth.uploadNewsMaterial(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async uploadPermanentMaterial() {
    const { ctx, service } = this;
    // 为啥要在controller传入参数呢，因为在这里可以进行数据的校验。在service里面是不做数据校验的。
    const params = ctx.request.query;
    const body = ctx.request.body;
    const res = await service.auth.uploadPermanentMaterial(params, body);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async updateNewsMaterial() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const res = await service.auth.updateNewsMaterial(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async getMaterial() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    const res = await service.auth.getMaterial(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}
// 使用co-wechat来回复消息
AuthController.prototype.weChat = coWeChat({
  token: config.token,
  appid: config.appId,
  encodingAESKey: "",
}).middleware(async (message, ctx) => {
  return await ctx.service.auth.replay(message);
});
module.exports = AuthController;

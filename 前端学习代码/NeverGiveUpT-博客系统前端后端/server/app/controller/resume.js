const Controller = require("egg").Controller;

class ResumeController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.queryListParamsRules = {
      page: {
        type: "string",
        required: false,
        allowEmpty: true,
        default: 1,
      },
      pageSize: {
        type: "string",
        required: false,
        allowEmpty: true,
        default: 10,
      },
    };

    this.createRule = {
      name: {
        type: "string",
        min: 2,
        max: 20,
        allowEmpty: false,
        format: /^[\u4E00-\u9FA5A-Za-z0-9_.]{2,20}$/,
      },
      avatar: {
        type: "string",
        required: false,
        allowEmpty: true,
      },

      city: {
        type: "string",
        min: 2,
        max: 50,
        allowEmpty: false,
        format: /^[\u4E00-\u9FA5A-Za-z0-9_.-]{2,50}$/,
      },
      education: {
        type: "string",
        min: 2,
        max: 10,
        allowEmpty: true,
        required: false,
        format: /^[\u4E00-\u9FA5A-Za-z0-9_.-]{2,10}$/,
      },
      email: {
        type: "string",
        allowEmpty: false,
        match: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
      },
      experience: {
        type: "string",
        min: 1,
        max: 2,
      },
      experiences: {
        type: "array",
        itemType: "object",
        allowEmpty: true,
        required: false,
      },
      projectExp: {
        type: "array",
        itemType: "object",
        allowEmpty: true,
        required: false,
      },
      gender: {
        type: "string",
        allowEmpty: false,
      },
      jobName: {
        type: "string",
        min: 2,
        max: 20,
        allowEmpty: false,
        format: /^[\u4E00-\u9FA5A-Za-z0-9_.-]{2,20}$/,
      },
      jobStatus: {
        type: "string",
        min: 2,
        max: 30,
        allowEmpty: false,
        format: /^[\u4E00-\u9FA5A-Za-z0-9_.-]{2,30}$/,
      },
      jobType: {
        type: "string",
        min: 2,
        max: 10,
        allowEmpty: false,
        format: /^[\u4E00-\u9FA5A-Za-z0-9_.-]{2,10}$/,
      },
      mobile: {
        type: "string",
        format: /^[0-9]*$/,
        allowEmpty: false,
      },
      salary: {
        type: "string",
        format: /^[0-9]*$/,
        allowEmpty: false,
      },
      summary: {
        type: "string",
        min: 1,
        max: 5000,
        allowEmpty: true,
        required: false,
      },
      weChat: {
        type: "string",
        allowEmpty: true,
        required: false,
      },
    };
  }

  async index() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    ctx.validate(this.queryListParamsRules, data);
    const res = await service.resume.index(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    ctx.validate(this.createRule, data);
    const res = await service.resume.create(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async destroy() {
    const { ctx, service } = this;
    const data = ctx.params;
    const res = await service.resume.destroy(data.id);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async update() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(this.createRule, data);
    const res = await service.resume.update({
      id,
      ...data,
    });
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async edit() {
    const { ctx, service } = this;
    const data = ctx.params;
    const res = await service.resume.edit(data.id);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async updateStatus() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const id = ctx.params.id;
    const res = await service.resume.updateStatus({
      id,
      status: data.status,
    });
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = ResumeController;

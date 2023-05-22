const Controller = require("egg").Controller;

class CategoriesController extends Controller {
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
            name: {
                type: "string",
                required: false,
                min: 2,
                max: 20,
                allowEmpty: true,
                format: /^[\u4E00-\u9FA5A-Za-z0-9_.]{2,20}$/,
            }
        }

        this.createRule = {
            name: {
                type: "string",
                min: 2,
                max: 20,
                allowEmpty: false,
                format: /^[\u4E00-\u9FA5A-Za-z0-9_.]{2,20}$/,
            }
        }
    }


    // 分类列表
    async index() {
        const {
            ctx,
            service
        } = this;
        const data = ctx.request.query;
        ctx.validate(this.queryListParamsRules, data);
        const res = await service.categories.index(data);
        ctx.helper.success({
            ctx,
            res
        });
    }

    // 添加分类
    async create() {
        const {
            ctx,
            service
        } = this;
        const data = ctx.request.body;
        ctx.validate(this.createRule, data);
        const res = await service.categories.create(data);
        ctx.helper.success({
            ctx,
            res
        });
    }



    // 删除分类
    async destroy() {
        const {
            ctx,
            service
        } = this;
        const data = ctx.params;
        const res = await service.categories.destroy(data.id);
        ctx.helper.success({
            ctx,
            res
        });
    }

    // 修改分类
    async update() {
        const {
            ctx,
            service
        } = this;
        const data = ctx.request.body;
        const id = ctx.params.id;
        ctx.validate(this.createRule, data);
        const res = await service.categories.update({
            id,
            name: data.name
        });
        ctx.helper.success({
            ctx,
            res
        });
    }

}

module.exports = CategoriesController;
import { Controller } from 'egg'
export default class LoginController extends Controller {
    public async index() {
        const category = [{
            "name": "Node课程",
            "id": 0,
            "children": [{
                "id": 1,
                "title": "Node课程-1",
                "price": 2000,
                "pic": "http://www.javascriptpeixun.cn/files/course/2020/12-27/123455feee70548009.png",
                "info": "Node课程-1这是架构课第七期课程"
            },
            {
                "id": 2,
                "title": "Node课程-2",
                "price": 2000,
                "pic": "http://www.javascriptpeixun.cn/files/course/2020/12-27/123455feee70548009.png",
                "info": "Node课程-1这是架构课第六期课程"
            },
            {
                "id": 3,
                "title": "Node课程-3",
                "price": 2000,
                "pic": "http://www.javascriptpeixun.cn/files/course/2020/12-27/123455feee70548009.png",
                "info": "Node课程-1这是架构课第六期课程"
            },
            {
                "id": 4,
                "title": "Node课程-4",
                "price": 2000,
                "pic": "http://www.javascriptpeixun.cn/files/course/2020/12-27/123455feee70548009.png",
                "info": "Node课程-1这是架构课第六期课程"
            }
            ]
        },
        {
            "name": "React课程",
            "id": 1,
            "children": [{
                "id": 5,
                "title": "redux课程",
                "price": 2000,
                "pic": "http://www.javascriptpeixun.cn/files/course/2019/10-13/205303f76f28949307.png",
                "info": "这是架构课第六期课程"
            },
            {
                "id": 6,
                "title": "手写dva",
                "price": 2000,
                "pic": "http://www.javascriptpeixun.cn/files/course/2019/10-13/2058433f3952027076.png",
                "info": "这是架构课第六期课程"
            },
            {
                "id": 7,
                "title": "手写react 15源码",
                "price": 2000,
                "pic": "http://www.javascriptpeixun.cn/files/course/2019/10-13/210719744a26341671.png",
                "info": "这是架构课第六期课程"
            },
            {
                "id": 8,
                "title": "React珠峰课堂",
                "price": 2000,
                "pic": "http://www.javascriptpeixun.cn/files/course/2019/10-13/212327f5a05b921128.png",
                "info": "这是架构课第六期课程"
            }
            ]
        },
        {
            "name": "vue课程",
            "id": 2,
            "children": [{
                "id": 9,
                "title": "eggjs",
                "price": 2000,
                "pic": "http://www.javascriptpeixun.cn/files/course/2019/10-13/212212432205480074.png",
                "info": "这是架构课第六期课程"
            },
            {
                "id": 10,
                "title": "egg + antd",
                "price": 2000,
                "pic": "http://www.javascriptpeixun.cn/files/course/2019/10-13/212117d849a7566307.png",
                "info": "这是架构课第六期课程"
            }, {
                "id": 11,
                "title": "mongo指南",
                "price": 2000,
                "pic": "http://www.javascriptpeixun.cn/files/course/2019/10-13/2120386020cc149382.png",
                "info": "这是架构课第六期课程"
            }
            ]
        }
        ]
        const { ctx } = this;
        let id = ctx.params.id;
        let {
            size,
            offset
        } = ctx.query;
        size = parseInt(size) || 5;
        offset = parseInt(offset) || 0
        let item = category.find(c => c.id == id); // 找到对应分类
        let result: any = []
        if (!item) {
            let list = category.reduce((memo, current: any) => {
                return memo.concat(current.children)
            }, []);
            result = list.slice(offset, offset + size);
        } else {
            result = item.children.slice(offset, offset + size);
        }
        ctx.body = {
            err: 0,
            data: {
                list: result,
                hasMore: result.length == size
            },
        }
    }
}

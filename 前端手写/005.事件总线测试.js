const EventEmitter = require('events');

class MyEventBus extends EventEmitter {
    constructor(props) {
        super()
    }

}
let index = 0;
const getIndex = (name) => `EventBus-${name}-${index++}`

const eventBus = {
    // 框架层
    Frame: {
        // 切换企业
        switchEnterprise: getIndex('switchEnterprise'),
        // 退出登录
        logout: getIndex('logout'),
        //账号归属的企业已禁用
        invalid: getIndex("invalid"),
        // 根据菜单name跳转到路由
        goRouterByName: getIndex("goRouterByName"),
        // 根据菜单ID跳转到路由
        goRouterById: getIndex("goRouterById")
    }
}

let myEventBus = new MyEventBus()

myEventBus.on(eventBus.Frame.switchEnterprise, (eventName, type) => {
    console.log("eventName", eventName);
    console.log("type", type);
}
)

myEventBus.on(eventBus.Frame.switchEnterprise, (eventName, type) => {
    console.log("eventName", eventName);
}
)
myEventBus.emit(eventBus.Frame.switchEnterprise, eventBus.Frame.switchEnterprise,'ddddd')

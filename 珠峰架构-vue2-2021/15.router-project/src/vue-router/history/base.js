//  路由公共的方法都放在这 大家共用

function createRoute(record, location) { // 创建路由
    const matched = [];
    // 不停的去父级查找
    if (record) {
        while (record) {
            matched.unshift(record);
            record = record.parent;
        } // /about/a => [about,aboutA]
    }
    return {
        ...location,
        matched
    }
}

function runQueue(queue,iterator,cb){
    function step(index){
        if(index >= queue.length) return cb();
        let hook = queue[index]; 
        iterator(hook,()=>step(index+1)); // 第二个参数什么时候调用就走下一次的
    }
    step(0);
}
export default class History {
    constructor(router) {
        this.router = router;
        // 有一个数据来保存路径的变化
        // 当前没有匹配到记录
        this.current = createRoute(null, {
            path: '/'
        }); // => {path:'/',matched:[]}    
    }
    listen(cb){
        this.cb = cb; // 保存当前的cb函数
    }
    transitionTo(path, cb) {  // {path:'/',matched:[record]}
        // 前端路由的实现原理 离不开hash h5
        let record = this.router.match(path); // 匹配到后
        let route = createRoute(record, { path });
        // 1.保证跳转的路径 和 当前路径一致
        // 2.匹配的记录个数 应该和 当前的匹配个数一致 说明是相同路由
        if (path ===  this.current.path && route.matched.length === this.current.matched.length) {
            return
        }
        // 在跳转前  我需要先走对应的钩子

        // 修改current _route 实现跳转的
        let queue = this.router.beforeHooks; 
       
        const iterator = (hook,next) =>{ // 此迭代函数可以拿到对应的hook
            hook(route,this.current,next);
        }
        runQueue(queue,iterator,()=>{
            this.updateRoute(route);
            cb && cb(); // 默认第一次cb是hashchange

            // 后置的钩子 
        })

        // 更新current 需要重新渲染视图

        // Vue.util.defineReactive();
        // 如果 两次路由一致  不要跳转了
    }
    updateRoute(route){
        this.current = route; // 不光要改变current , 还有改变_route
        this.cb && this.cb(route); 
    }


}
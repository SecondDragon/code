/*
 * Singleton [ˈsɪŋɡltən]单例模式 && Command [kəˈmænd]命令模式
 *   + 早期的模块化编程
 *     + AMD「require.js」
 *     + CMD/CommonJS 「sea.js & Node」   webpack(Node -> CommonJS)
 *     + ES6 Module
 *     + ...
 *   + 业务逻辑处理
 */
// 单例设计模式：基于单独的实例，来管理某一个模块中的内容，实现模块之间的独立划分「但是也可以实现模块之间方法的相互调用」

/*
// 程序员A开发的-模块A
var AModule = (function () {
    var data = [];

    function bindHTML() {
        // ...
    }

    function change() {
        // ...
    }

    return {
        change: change
    };
})();

// 程序员B开发的-模块B
var BModule = (function () {
    var data = [];

    function bindHTML() {
        // ...
    }

    AModule.change();

    return {
        bindHTML: bindHTML
    };
})();
*/

/* // 业务来讲：按照一定的顺序依次执行对应的方法，从而实现整个板块功能的开发
let SearchModule = (function () {
    let body = document.body;

    function queryData() {}

    function bindHTML() {}

    function handle() {}

    return {
        // init相当于大脑，可以控制谁先执行，谁后执行 「命令模式」
        init: function () {
            queryData();
            bindHTML();
            handle();
        }
    };
})();
SearchModule.init(); */

/* 
let AModule = (function () {
    let arr = [];

    let change = function change(val) {
        arr.push(val);
        console.log(arr);
    };

    return {
        change: change
    };
})();

AModule.change(10); 
AModule.change(20);
// 如果不想每一次执行change,都修改使用相同的东西,这样会产生关联和影响? 
*/

/* 
 * Constructor [kənˈstrʌktər]构造器模式
 *    + 类&实例
 *    + 私有&公有属性方法
 *    + 插件组件封装
 */
// AModule:类「构造函数」
/* class AModule {
    constructor() {
        // this->每个类的实例
        this.arr = [];
    }
    // 原型上 公共的属性和方法
    change(val) {
        this.arr.push(val);
        console.log(this.arr);
    }
}

let A1 = new AModule;
let A2 = new AModule;
console.log(A1, A2);
console.log(A1 === A2); //->false
console.log(A1.arr === A2.arr); //->false
console.log(A1.change === A2.change); //->true
A1.change(10);
A2.change(20); 
*/


/*
 * Factory [ˈfæktri]工厂模式
 *   + 简单的工厂模式
 *   + JQ中的工厂模式
 */
// 项目：一个产品 调用数据库，根据量级或者需求等不同的因素，我们需要让产品切换调用到不同的数据库中 oracle sqlserver mysql  -> DB层，根据逻辑或者标识，能切换连接的数据库
// 工厂模式：工厂可以帮助我们实现调用的切换，或者实现一些中转的处理

/* 
function factory(options) {
    options = options || {};
    let {
        type,
        payload
    } = options;
    if (type === 'array') {
        // 执行A，完成一个逻辑
        return;
    }
    // 执行B，完成另外的逻辑
}
factory({
    type: 'array',
    payload: 100
});

factory({
    type: 'object',
    payload: 'zhufeng'
}); 
*/

/* 
(function () {
    var jQuery = function (selector, context) {
        // 创建init类的实例
        return new jQuery.fn.init(selector, context);
    };
    jQuery.fn = jQuery.prototype = {
        // ...
    };

    // 需要工厂的转换
    var init = jQuery.fn.init = function (selector, context, root) {};
    init.prototype = jQuery.fn;

    window.$ = jQuery;
})();
$('xxx'); //-> jQuery('xxx') 创建JQ类的实例，调取jQuery.fn原型上的方法 
*/


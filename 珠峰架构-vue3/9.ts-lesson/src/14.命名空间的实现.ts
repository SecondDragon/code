// 命名空间  js中是默认没有命名空间 我们最早实现命名空间 

// 命名空间解决的问题： 解决命名冲突 ， （调用过长的问题，可能还是有重名的问题）

// ts就自己实现了命名空间

// 内部模块 使用命名空间来声明，解决同一个文件下的命名冲突问题, 注意module在使用的时候， 最终还是希望你写成namespace, 后面有一种场景 只能使用module关键字

namespace Home1 {
    //export class Dog{} // 命名空间中的内容 需要导出
    export const b = 'abc'
    export namespace Graden{
        export const a = '花园'; // 命名空间就是通过自执行函数来是实现的，我们一般写代码不会使用
    }
}

namespace Home1 {
    export class Dog{};
    export const a = 'abc'
}
Home1.Graden.a


// 两个重名的命名空间会合并，但是合并后重名的会报错
// module
// 命名空间可以进行无线嵌套


// namespace / module 我们称之为内部模块
// 外部模块 import export




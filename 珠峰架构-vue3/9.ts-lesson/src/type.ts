// 声明语法，用于引用第三放模块时 无法找到变量的类型， 通过declare后使用
declare let a:string;
declare function fn():void;
declare class Person{
    constructor(name:string)
}
declare interface tomato {
    color:string
}
declare enum Seasons {
    Spring,
    Summer
}
declare namespace A {
      const a:string // declare中的内容 不需要默认导出,也不用declare了
}
declare module '*.vue' {
    const component:object;
    export default component
}
// declare module 'jquery'{}
declare module '*.jpg'{}
// 默认没有import 和 export 这里的声明就是全局的


// declare 名字可能会冲突 
// 接口同名默认会合并  命名空间也能合并  函数和命名空间能合并

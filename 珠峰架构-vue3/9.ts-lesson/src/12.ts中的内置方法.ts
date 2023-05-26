// ts中其他的内置类型 ， 根据定义好的已有的类型 演变出一些其他类型
interface ICompany {
    name: string,
    address: string
}
interface IPerson {
    name?: string,
    age: number,
    company?: ICompany
}

// 1.Partial:表示选项可以是选填的 , 深度递归 ，默认不是深度递归
// type Partial<T> = { [K in keyof T]?: T[K] extends object?Partial<T[K]>:T[K]}
type MyPerson = Partial<IPerson>
let person: MyPerson = {
    name: 'zf',
    age: 11
}

// 2.Required  -? 去掉可选
// type Required<T> = { [K in keyof T]-?: T[K] }
type MyRequired = Required<MyPerson>

// 3.Readonly 
// type Readonly<T> = { readonly [K in keyof T]: T[K] }
type MyReadonly = Readonly<IPerson>


// 4.Pick 精挑细选  （对象里选属性） extract 抽离可用的 （类型中选择类型）


type Pick<T, K extends keyof T> = { [X in K]: T[X] }; // 挑选属性
type MyPick = Pick<IPerson, 'age' | 'company'>


// 5.Omit 忽略属性  两个对象的合并 T&K

// 我要的是忽略掉name的其他的
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
type MyType = Omit<IPerson, 'name'> & { name: string };

// 6.Record类型
// let obj:Record<string,any> = {a:1,b:2}


// map方法  map可用把一个对象映射成一个新对象 {name:'zf',age:12 } => name:'$zf' ,age:'$12'
                                     // K = symbol|string|number   V = string | number

type Record<K extends keyof any, T> = { // 约等于 任意接口
[P in K]: T;  // string:value  number:value  symbol:value

// [key:string]:T
};
function map<K extends keyof any, V, X>(obj: Record<K, V>, cb: (item: V, key: K) => X):Record<K,X> {
    let result= {} as Record<K,X> ;
    for(let key in obj){
        result[key] = cb(obj[key],key)
    }
    return result
}

let r = map({ name: 'zf', age: 12 }, (item) => {
    return '$' + item
})

// Exclude Extract NonNullable ReturnType ParamaterType ....
// Pick Omit Record Partial Readonly Required....

export { }

// ts 咱们周三讲完  周五讲组件库 流程-> vue3 写组件的流程  ->  ast -》 codegen

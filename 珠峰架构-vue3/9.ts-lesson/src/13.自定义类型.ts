// ts的概念 装包和拆包 
// ref(10) => xxx.value   在模板里面取值 拆包 {{xxx}}  泛型
// wrap  unwrap
let data = { // defineProperty
    name: 'zf',
    age: 12
}
type Proxy<T> = { // 他可以复用
    get(): T,
    set(value: any): void
}
type Proxify<T extends object> = {
    [K in keyof T]: Proxy<T[K]>
}
function proxify<T extends object>(obj: T): Proxify<T> {
    let result = {} as Proxify<T>;
    for (let key in obj) {
        let value = obj[key]
        result[key] = {
            get() {
                return value
            },
            set(newValue) {
                value = newValue
            }
        }
    }
    return result;
}
let proxyDatas = proxify(data);
// 为什么vue2 没有这种方式 ，需要用户学习新的api
console.log(proxyDatas.name.get())
proxyDatas.name.set('xxx');
console.log(proxyDatas.name.get())

function unProxify<T extends object>(obj: Proxify<T>): T {
    let result = {} as T;
    for (let key in obj) {
        let value = obj[key]
        result[key] = value.get();
    }
    return result;
}
let data2 = unProxify(proxyDatas);



// 演变的类型 后续会使用的
let person1 = {
    name: 'zf',
    age: 12,
    address: '回龙观'
}
let person2: {
    address: '回龙观'
}
// 差集  获取两个类型的差集  exclude 在一群类型中忽略掉某个类型  和 omit 对象中忽略
type Diff<T extends object, K extends object> = Omit<T, keyof K>;
type myDiff = Diff<typeof person1, typeof person2>;

// 交集 不是交叉类型  从一个对象中挑取某个类型  Extract
type Inter<T extends object, K extends object> = Pick<K, Extract<keyof T, keyof K>>
type myInter = Inter<typeof person1, typeof person2>;


// 两个对象合并的问题 T & K  = 会有可能导致属性值是never的问题

type Person1 = { // T
    name: string,
    age: number
}
type Person2 = { // K
    age: string,
    address: string
    a: string,
    b: number
}
// 两个类型合并 两个对象的合并 一般都是以后者为准， 如果person1 里面有的 person2里没有在进行添加

// 1.需要拿到多余的肯定是要的
// 2.公告的以后面的为准
// Diff<K, T> 拿到的是 person2 中多的
// 在person1 中忽略person2 的属性
// type Merge<T extends object , K extends object> =  Diff<T, K> &  Diff<K, T> & Inter<T,K>;
type myMerge = Compute<Merge<Person1, Person2>>;
let merge: myMerge = {
    name: 'abc',
    address: 'abc',
    a: '1',
    b: 0,
    age: 'abc'
}
// 我直接 在T里面 忽略掉 K里的  ， 只剩T中独有的 + K的
type Compute<T> = { [K in keyof T]: Compute<T[K]> }; // 将类型展开方便提示
type Merge<T extends object, K extends object> = Omit<T, keyof K> & K;

// 主要记住 我们核心的方法 Omit Extract exclude   typeof keyof in  extends

export {}
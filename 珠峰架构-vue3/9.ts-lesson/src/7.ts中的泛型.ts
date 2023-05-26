// 泛型的用处在于 当我们调用的时候 确定类型，而不是一开始就写好类型，类型不确定，只有在执行的时候才能确定

// 1.单个泛型 声明的时候 需要用 <>包裹起来， 传值的时候也需要
// function createArray<T>(times: number, value: T): Array<T> { // 根据对应参数的类型给T赋值
//     let result = [];
//     for (let i = 0; i < times; i++) {
//         result.push(value)
//     }
//     return result
// }
// let r = createArray(5, 'abc');

// interface IMyArr<T> {
//     [key: number]: T
// }
// interface ICreateArray<K> { // interface后面的 类型 和 函数前面的类型的区别， 如果放在函数前 表示使用函数的时候确定了类型， 放在接口的后面 表示是使用接口的时候确定类型
//     <T>(x: K, y: T): IMyArr<T>;
// }
// // type ICreateArray = <T>(x: number, y: T)=>Array<T>; // 如果泛型不传参是unkown类型
// const createArray: ICreateArray<number> = <T>(times: number, value: T): Array<T> => {
//     let result = [];
//     for (let i = 0; i < times; i++) {
//         result.push(value)
//     }
//     return result
// }
// createArray(3, 'abc');



// 2.多个泛型 元组进行类型交换
// const swap = <T, K>(tuple: [T, K]): [K, T] => { // 元组是特殊的数组
//     return [tuple[1], tuple[0]]
// }
// let r = swap([{}, 'xx']); // => [123,'abc']  我能确定只有两项

// const sum = <T extends string>(a: T, b: T): T => { // 约束对象
//     return (a + b) as T
// }
// sum('a','v')


// 3) 泛型约束 主要强调类型中必须包含某个属性
type withLen = { length: number }

const computeArrayLength = <T extends withLen, K extends withLen>(arr1: T, arr2: K): number => {
    return arr1.length + arr2.length
}

computeArrayLength('123', { length: 3 })
const getVal = <T extends object, K extends keyof T>(obj: T, key: K) => {
    if (typeof obj !== 'object') {
        return
    }
}
type T1 = keyof { a: 1, b: 2 }
type T2 = keyof string
type T3 = keyof any; // string  |number | symbol


getVal({ a: 1, b: 2 }, 'a')



// 泛型可以给类来使用 

class GetArrayMax<T = number> { // [1,2,3] [a,b,c]
    public arr: T[] = [];
    add(val: T) {
        this.arr.push(val)
    }
    getMax():T {
        let arr = this.arr;
        let max = arr[0];
        for (let i = 1; i < arr.length; i++) {
            arr[i] > max ? max = arr[i] : null
        }
        return max;
    }
}
let arr = new GetArrayMax(); // 泛型只有当使用后才知道具体的类型
arr.add(1);
arr.add(2)
arr.add(3)
let r = arr.getMax()

// 泛型可以在 函数 类 （接口、别名） 中使用 

// extends 约束  keyof 取当前类型的key  typeof 取当前值的类型


interface ISchool <T = number>{
    name:T
}
type BoolSchool = ISchool<boolean>
type NumberSchool = ISchool
export { }
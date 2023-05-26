// 联合类型  如果不进行初始化操作 必须要给类型 否则都是any
let numOrStr: string | number;
// 默认联合类型 在没有确定类型之前 只能调用两个类型共同的方法

// 在变量确定类型后 可以设置对应的方法

numOrStr = 'abc';
numOrStr = 123;

// 如果赋予类型后，可以根据上下文自动推断对应类型的方法

// 场景？  在取值的时候也会遇到联合类型 

const ele: HTMLElement | null = document.getElementById('app');

// ! 非空断言 表示这个东西一定有值，告诉ts 按照我的想法来，如果后续出错我负责, 一定不为空  ts特有
// as / <> 直接强转某个类型 , 强制告诉人家 这个类型就是里面的某一个，墙转要求必须联合类型中有才行

// ele!.innerHTML = 'abc';

let a: string | number | undefined

// jsx 语法 <div class={}>   <boolean>a 和jsx 冲突 所以不建议使用
(a as any) as boolean; // 双重断言 先转化成any 在转换成一个具体的类型，问题是会导致类型出问题
// ? 号  aa && aa.xxx && aa.xxx.xxx  链判断运算符  ?是js中就存在的

ele?.style?.color

// || && | & | ??
false ?? true // ?? 表示排除 null和undefined



// 字面量类型  类型的内容是固定  枚举
// 如果类型过于复杂，我希望后续复用 我们可以把类型单独提取出来

type IType = 'a' | 'b' | 'c' | 'd'; // 类型别名
let type: IType = 'b'
let typ2: IType = 'c'

// | ! 这些都是用在类型里的


// as ! type


export { }
namespace a {
    //接口的兼容性 ts跟类型没有别有关系
    interface Animal {
        name: string;
        age: number
    }

    interface Person {
        name: string;
        age: number;
        speak: (words: string) => void
    }
    function getName(animal: Animal): string {
        return animal.name;
    }
    let p: Person = {
        name: 'zhufeng',
        age: 10,
        speak() { }
    }

    console.log(getName(p));

    //基本类型的兼容性
    let num: string | number = 1;
    let str: string = 'hello';
    num = str;

    let num2: {
        toString(): string
    }
    let str2: string = 'jiagou';

}
namespace b {
    //类的兼容性  跟 类型无关
    class Animal {
        name: string
    }

    class Bird extends Animal {
        //swing: number
    }
    let a: Animal;
    a = new Bird();//父类的变量能指向子类的实例

    let b: Bird;
    b = new Animal();//子类的变量不能指向父类的实例
    b = { name: 'zhufeng' }//不管这个对象的具体类型，只要属性有就可以

}

namespace c {
    //函数兼容性
    //比较参数
    type sumFunction = (a: number, b: number) => number;
    let sum: sumFunction;
    function f1(a: number, b: number): number {
        return a;
    }
    sum = f1;
    function f2(a: number): number {
        return a;
    }
    sum = f2;
    function f3(): number {
        return 1;
    }
    sum = f3;
    function f4(a: number, b: number, c: number): number {
        return a;
    }
    //sum = f4;//参数可以少，但是不能多

    // 比较返回值
    type GetPerson = () => { name: string, age: number };
    let getPerson: GetPerson;
    function g1() {
        return { name: 'string', age: 10 };
    }
    getPerson = g1;
    function g2() {
        return { name: 'string' };
    }
    //getPerson = g2;//少了可不行
    function g3() {
        return { name: 'string', age: 10, home: 'beijing' };
    }
    getPerson = g3;

    /*   interface T {
          name: string
      }
      let t: T = { name: 'zhufeng', age: 10 }
      */
    //函数参数的协变
    type logFunc = (a: number | string) => boolean;
    let log: logFunc;
    function log1(a: number | string | boolean) {
        console.log(a);
    }
    log1(true);
    //判断兼容性的时候先判断具体 的类型再进行兼容 性判断
    interface Empty<T> {
        data: T
    }
    let x!: Empty<string>;//{data:string}
    let y!: Empty<number>;//{data:number}
    //x = y;

    interface NotEmptyString<T> {
        data: string
    }
    interface NotEmptyNumber<T> {
        data: number
    }
    // 枚举的兼容性
    enum Colors {
        Red, Yellow
    }
    let c: Colors;
    c = Colors.Red;//=0
    c = 1;
    let d: number;
    d = Colors.Yellow;//1
} 
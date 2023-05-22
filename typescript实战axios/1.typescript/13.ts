namespace a {
    let x = { name: 'zhufeng' }
    let a = typeof x;
    type b = typeof x;
    console.log(a);
    console.log(b);

    class Person {
        public name: string = 'zhufeng'
    }
    type PartialPerson = Partial<Person>;
    let p: PartialPerson = {
        name: 'zhufeng'
    }
    //元组和长度和类型是固定的
    let xx: [string, number] = ['1', 1];
    //console.log(xx[2]);
    //什么时候用interface 什么时候用type 还有class，三者一般都在啥时候用
    //interface是定义接口类型，它是 真实的类型，也可能会被导出和导入
    //type只是临时用的别名 ，并不会产出真正的类型
    //class就是定义类 new xxx



    interface Fish2 {
        name1: string;
        age: number
    }
    interface Fish {
        name1: string
    }
    interface Water {
        name2: string;
    }
    interface Bird {
        name3: string
    }
    interface Sky {
        name4: string
    }
    type Condition<T> = T extends Fish ? Water : Sky;
    let condition: Condition<Fish2> = {
        name2: 'water'
    };
    // typeof instanceof  in 判断一个宽泛类型的具体类型

    //条件类型的分发
    type Condition2<T> = T extends Fish ? Water : Sky;
    // Condition2<Fish | Bird>=Water | Sky;
    let c1: Condition2<Fish | Bird> = { name2: 'zhufeng' };
    let c2: Condition2<Fish | Bird> = { name4: 'zhufeng' };
    let c3: Water | Sky = { name2: 'zhufeng' };
    let c4: Water | Sky = { name4: 'zhufeng' };

    interface Person5 {
        name: string;
        age: number;
        gender: 'male' | 'female';
    }
    //批量把一个接口中的属性都变成可选的
    type PartPerson5 = {
        [Key in keyof Person5]?: Person5[Key]
    }
    type Person6 = Person5;

}

namespace c {
    type E = Exclude<string | number, string>;//从前者中排除掉后者
    let e: E = 10;
    type E2 = Extract<string | number | null, string>;
    let e2: E2 = 'hello';
    type E3 = NonNullable<string | number | undefined | null>;
    let e3: E3 = 'hello';
    let e4: E3 = 10;
    //redux 会要到的ReturnType
    function getUserInfo() {
        return { name: 'zhufeng', age: 10 };
    }
    type UserInfo = ReturnType<typeof getUserInfo>;
    let user: UserInfo = { name: 'zhufeng', age: 10 };

    //instanceType 获取构造函数的实例类型
    class Person5 {
        name: string;
        constructor(name: string) {
            this.name = name;
        }
    }
    type P = InstanceType<typeof Person5>;
    let p: P = new Person5('zhufeng');





}
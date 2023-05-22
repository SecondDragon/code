namespace a {
    interface Bird {
        name: string;
        fly(): void
    }
    interface Person {
        name: string;
        eat(): void;
    }
    //交叉类型其实就是二个接口类型的属性的并集
    type BirdMan = Bird & Person;
    let p: BirdMan = {
        name: 'zhufeng',
        fly() { },
        eat() { }
    }
}

namespace b {
    // typeof 可以获取一个变量的类型
    /* type Person = {
        name: string;
        age: number
    } */
    let p = {
        name: 'zhufeng',
        age: 10
    }
    //type是用来定义类型的 let var 只能定义值，
    type Person = typeof p;
    let p2: Person = {
        name: 'zhufeng',
        age: 20
    }
    // 我们可以通过[]来获取一个类型的子类型
    interface Person2 {
        name: string;
        age: number;
        job: {
            name: string
        };
        interests: Array<{ name: string; level: number }>
    }
    let myname: Person2['job']['name'] = 'fe';
    let mylevel: Person2['interests'][0]['level'] = 10;

    // keyof 索引类型查询操作符
    interface Person3 {
        name: string;
        age: number;
        gender: 'male' | 'female';
        //[propName: string]: any
    }
    //type Person3Keys = 'name' | 'age' | 'gender';
    type Person3Keys = keyof Person3;//返回一个接口它的key的集合
    function getValueByKey(val: Person3, key: Person3Keys): any {
        return val[key];//xx
    }
    let person3: Person3 = {
        name: 'zhufeng',
        age: 10,
        gender: 'male',
        //xx: '1'
    }
    let name = getValueByKey(person3, 'name');
    console.log('name', name);

    //映射类型 在定义的的时候用in操作符去批量定义
    interface Person4 {
        name: string;
        age: number;
        gender: 'male' | 'female';
    }
    /* type PartialPerson = {
        [key in keyof Person4]?: Person4[key]
    } */
    /* type Partial<T> = {
        [key in keyof T]?: T[key]
    } */
    type PartialPerson = Partial<Person4>;
    let p4: PartialPerson = {
        name: 'zhufeng',
        age: 10,
    }
    type Required<T> = {
        [key in keyof T]-?: T[key]
    }
    type RequiredPerson = Required<Person4>;
    let p5: RequiredPerson = {
        name: 'zhufeng',
        age: 10,
        gender: 'male'
    }
    type Readonly<T> = {
        readonly [key in keyof T]: T[key]
    }
    type ReadOnlyPerson = Readonly<Person4>;
    let p6: ReadOnlyPerson = {
        name: 'zhufeng',
        age: 10,
        gender: 'male'
    }
    //p6.name = 'jiagou';
    //Pick
    //keyof T= name|age|
    type Pick<T, K extends keyof T> = {
        [key in K]: T[key]
    }
    type PickPerson = Pick<Person4, 'name'>;
    /*  interface PickPerson {
         name: string;
     } */
    let x: PickPerson = {
        name: 'name'
    };
    //TS 要区分类型和值  类型 interface class enum  值 let var function
    //interface Person4 = Person3 接口不能当成值来用，也不能用来赋值
    //interface typeof
    type Person5 = Person3;
    let a = typeof x;
    type b = typeof x;


}

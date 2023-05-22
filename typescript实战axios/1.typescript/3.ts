//如何定义类
//Property 'name' has no initializer and is not definitely assigned 
//in the constructor.ts(2564)
namespace a {
    class Person {
        name: string = 'zhufeng';
        age: number;
        constructor() {
            this.age = 10;
        }
    }
    let p1 = new Person();
    console.log(p1.name);
    console.log(p1.age);
}

namespace b {
    // 存取器 getter setter
    class Person {
        myname: string;
        constructor(name: string) {
            this.myname = name;
        }
        get name() {
            return this.myname;
        }
        set name(newVal: string) {
            this.myname = newVal.toUpperCase();
        }
    }
    let p = new Person('zhufeng');
    console.log(p.name);//zhufeng
    p.name = 'jiagou';
    console.log(p.name);
}
namespace c {
    class Person {
        constructor(public name: string) {

        }
    }
    let p = new Person('zhufeng');
    p.name = 'jiagou';
}
//继承
/**
 * 子类继承父类后子类的实例上就拥有了父类中的属性和方法
 * 访问修饰符 public protected private
 * public 自己 自己的子类 和其它类都可能访问
 * protected 受保护的 自己和自己的子类能访问 ，其它 类不能访问
 * private 私有的 只能自己访问，自己的子类不能访问，其它更不行了
 */
namespace d {
    class Person {
        public name: string;
        protected age: number;
        private amount: number;
        constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
            this.amount = 100;
        }
        getName() {
            return this.name;
        }
        setName(newName: string) {
            this.name = newName;
        }
    }
    class Student extends Person {
        static type = 'Student'
        stuNo: number;
        constructor(name: string, age: number, stuNo: number) {
            super(name, age);
            this.stuNo = stuNo;
        }
        static getType() {
            return Student.type;
        }
        getStuNo() {
            return this.name + this.age + this.amount + this.stuNo;
        }
        setStuNo(newStuNo: number) {
            this.stuNo = newStuNo;
        }

    }
    let s = new Student('zhufeng', 10, 1);
    console.log(s.name);
    console.log(s.age);
    console.log(s.amount);
    console.log(Student.type);
    Student.getType();
}


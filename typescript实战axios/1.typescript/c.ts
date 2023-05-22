//namespace  第一个作用是封装类似的代码 第二个作用防止命名冲突
namespace zoo {
    class Dog {

    }
}
namespace home {
    export class Dog {

    }
}
let dog = new home.Dog();
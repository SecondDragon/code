/* 

function Father(){
    this.name = 'zhufeng';
}
Father.staticName = 'father';

function Child(){
    Father.call(this);
    this.age = 12;
} */
class Father {
    static staticName='father'
}
class Child extends Father {

}

let child = new Child();
console.log(Child.staticName);

//静态属性是不是就是类上的属性 是的
//子类就取不到 能取到
//子类继承父类的的静态属性
//子类实例继承父类的实例的实例属性
class Person{

}
class Child extends Person{
    constructor(){
        super();
    }
}
let child = new Child();
//ReferenceError: Must call super constructor in derived class
// before accessing 'this' or returning from derived constructor
console.log(child);
/*
 class Person{
    say = ()=>{
        console.log(this);
    }
}
new Person().say() */

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value, enumerable: true, configurable: true, writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

class Person {
    constructor() {
        //this
        //为什么函数的this永远指向类组件的实例
        _defineProperty(this, "say", () => {
            console.log(this);
        });
    }

}



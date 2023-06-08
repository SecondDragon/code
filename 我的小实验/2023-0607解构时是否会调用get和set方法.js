// let person = {
//   name: "stl",
//   age: 18,
//   son: {
//     name: "stl2",
//     age: 12,
//   },
//   getters(key){

//   }
// };

class Person {
  constructor() {
    this.name = "stl";
    this.age = 18;
    this.son = {
      name: "stl2",
      age: 12,
    };
  }
}
debugger;
let stl = new Person();

const isObject = (value) => typeof value == "object" && value !== null;
let proxyStl = (function reactive(ob) {
  return new Proxy(ob, {
    get(target, key, receiver) {
      console.log("get key", key);
      const res = Reflect.get(target, key, receiver);
      if (isObject(res)) {
        // vue2 是一上来就递归，vue3 是当取值时会进行代理 。 vue3的代理模式是懒代理
        return reactive(res);
      }
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver); // target[key] = value

      console.log("set",key,value);
      return result;

    },
  });
})(stl);

let { name, age, son } = proxyStl; //proxyStl被解构赋值的时候会调用 proxyStl的get

console.log(name);
console.log(age);
name='22222' // 不会调用 proxyStl的set

son.age=199 //会调用自己的set
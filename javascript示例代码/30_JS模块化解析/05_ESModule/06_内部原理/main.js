import { name, age } from './foo.js'

console.log(name, age)

setTimeout(() => {
  console.log(name, age)
}, 2000)

setTimeout(() => {
  name == 'ddddddd';
  age=76
}, 2000);

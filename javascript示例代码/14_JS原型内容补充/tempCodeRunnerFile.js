function myInstanceOf(instance, Type) {
  
  let prototype = Type.prototype
  let proto = Object.getPrototypeOf(instance)
  while (proto) { 
    if (prototype === proto) {
      return true
    } else { 
      proto = Object.getPrototypeOf(proto)
    }
  }
  
}

console.log(myInstanceOf(stu, Person) ) // true
console.log(myInstanceOf(stu, Object) ) // true
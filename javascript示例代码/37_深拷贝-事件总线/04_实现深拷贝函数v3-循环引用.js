// function isObject(value) {
//   const valueType = typeof value
//   return (value !== null) && (valueType === "object" || valueType === "function")
// }



// function deepClone(originValue, map = new WeakMap()) {
//   // 判断是否是一个Set类型
//   if (originValue instanceof Set) {
//     return new Set([...originValue])
//   }

//   // 判断是否是一个Map类型
//   if (originValue instanceof Map) {
//     return new Map([...originValue])
//   }

//   // 判断如果是Symbol的value, 那么创建一个新的Symbol
//   if (typeof originValue === "symbol") {
//     return Symbol(originValue.description)
//   }

//   // 判断如果是函数类型, 那么直接使用同一个函数
//   if (typeof originValue === "function") {
//     return originValue
//   }

//   // 判断传入的originValue是否是一个对象类型
//   if (!isObject(originValue)) {
//     return originValue
//   }
//   if (map.has(originValue)) {
//     return map.get(originValue)
//   }

//   // 判断传入的对象是数组, 还是对象
//   const newObject = Array.isArray(originValue) ? []: {}
//   map.set(originValue, newObject)
//   for (const key in originValue) {
//     newObject[key] = deepClone(originValue[key], map)
//   }

//   // 对Symbol的key进行特殊的处理
//   const symbolKeys = Object.getOwnPropertySymbols(originValue)
//   for (const sKey of symbolKeys) {
//     // const newSKey = Symbol(sKey.description)
//     newObject[sKey] = deepClone(originValue[sKey], map)
//   }
  
//   return newObject
// }

function isObject(value) { 
  const valueType = typeof value
  return valueType!==null &&( valueType==='function' || valueType==='object')
}


function deepClone(originValue, map = new WeakMap()) {
    // 判断是否是一个Set类型
    if (originValue instanceof Set) {
      return new Set([...originValue])
    }

    // 判断是否是一个Map类型
    if (originValue instanceof Map) {
      return new Map([...originValue])
    }
  if (typeof originValue === "function") {
    return originValue;
  }

  if (typeof originValue === "symbol") {
    return Symbol(originValue.description);
  }
  if (!isObject(originValue)) {
    return originValue;
  }

  if (map.has(originValue)) {
    return originValue;
  }

  let newObject = Array.isArray(originValue) ? [] : {};
  // 是通过存储键值对一样的对象。包括你深拷贝最终返回的对象。
  // 就是说你Map中有一个键值对就是key是目标对象，value也是目标对象。
  // 当有循环引用，递归调用时，就会加一个条件，如果map中有这个对象的话，直接返回这个对象。
  // 前提是，每一次递归的时候，我们保存了这个对象为key，value也为这个对象的键值对在Map中。
  map.set(originValue, newObject);

  for (const key in originValue) {
    newObject[key] = deepClone(originValue[key], map);
  }

  // 对Symbol的key进行特殊的处理
  const symbolKeys = Object.getOwnPropertySymbols(originValue);
  for (const sKey of symbolKeys) {
    // const newSKey = Symbol(sKey.description)
    newObject[sKey] = deepClone(originValue[sKey], map);
  }

  return newObject;
}











// deepClone({name: "why"})


// 测试代码
let s1 = Symbol("aaa")
let s2 = Symbol("bbb")

const obj = {
  name: "why",
  age: 18,
  friend: {
    name: "james",
    address: {
      city: "广州"
    }
  },
  // 数组类型
  hobbies: ["abc", "cba", "nba"],
  // 函数类型
  foo: function(m, n) {
    console.log("foo function")
    console.log("100代码逻辑")
    return 123
  },
  // Symbol作为key和value
  [s1]: "abc",
  s2: s2,
  // Set/Map
  set: new Set(["aaa", "bbb", "ccc"]),
  map: new Map([["aaa", "abc"], ["bbb", "cba"]])
}

obj.info = obj

const newObj = deepClone(obj)
console.log(newObj === obj)

obj.friend.name = "kobe"
obj.friend.address.city = "成都"
console.log(newObj)
// console.log(newObj.s2 === obj.s2)

// console.log(newObj.info.info.info)

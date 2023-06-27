function findObject(obj, key, value) {
  if (obj[key] === value) {
    return obj;
  }

  let keys = Object.keys(obj);

  for (const prop of keys) {
    if (typeof obj[prop] == "object") {
      let result = findObject(obj[prop], key, value);

      if (result) {
        return result;
      }
    }
  }
}

let a = [
  {
    name: "xiaoming",
    age: "32",
    children: [{ name: "xiaoqing", children: [{ name: "xiaoku" }] }],
  }
];

console.log(findObject(a,'name','xiaoku'));
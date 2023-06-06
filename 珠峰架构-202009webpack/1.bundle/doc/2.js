function fn(mod, exports) {
  console.log(this);
  console.log(mod);
  console.log(exports);
}
let mod = {
     id: 'id',
     exports:{age:10}
}
fn.call(mod.exports, mod, mod.exports);

fn(mod, mod.exports); 
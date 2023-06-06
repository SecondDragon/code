var _this;
//this=exports={}
console.log(this === module.exports);
const sum = (_this = this, function sum(a, b) {
  console.log(_this);
  return a + b;
});

let result = sum(1,2);
console.log(result);
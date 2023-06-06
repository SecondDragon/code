//toStringTag
let toString = Object.prototype.toString;
console.log(toString.call('foo'));// new String('foo')
console.log(toString.call([1,2]));
console.log(toString.call(3));
console.log(toString.call(true));
console.log(toString.call(undefined));
console.log(toString.call(null));
console.log(toString.call(Symbol('symbol')));
let myExports = {};
//Object.defineProperty(myExports,Symbol.toStringTag,{value:'Module'});
console.log(Object.prototype.toString.call(myExports));
//Object.create(null);
/* function create(proto){
  function F(){}
  F.prototype = proto;
  return new F();//newF().__proto___=proto;
} */
var ns = Object.create(null);
ns.name='zhufeng';
console.log(Object.getPrototypeOf(ns));
for(let key in ns){
    //if(Object.hasOwnProperty(ns,key)){
        console.log(key,ns[key]);
    //}
}
//getter
let obj = {};
var ageValue = 10;
Object.defineProperty(obj,'age',{
    get(){
        return ageValue;
    },
    set(newValue){
        ageValue = newValue*2;
    },
    enumerable:true,//是否可以枚举
    configurable:true//是否可以删除
});
console.log(obj.age);
obj.age = 20;
console.log(obj.age);

//按位与
//比特二进制 0 和1 位 bit,数据存储的最小单位
//每8个位称为一个字节
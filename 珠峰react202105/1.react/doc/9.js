//子类的实例 指向父类的prototype , 父类的属性绑定在父类的实例上，所以子类拿不到父类的属性

class Father{

}
class Child extends Father{

}
let child = new Child();
console.log('====================================');
console.log(child.__proto__.__proto__===Father.prototype );
console.log('====================================');
//console.log(child? === Father.prototype);
//中午思考想想


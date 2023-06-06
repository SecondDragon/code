
class HookCodeFactory{
    setup(instance,options){
        this.options = options;
        //给hook实例的_x赋值 钩子函数的数组
        instance._x= options.taps.map(item=>item.fn);
    }
    args(){
        return this.options.args.join(',');//args = [name,age]=>name,age
    }
    header(){
        //this就是钩子的实例,钩子实例身上是不是有一个_x属性,里面放着所有的钩子函数
        return `var _x = this._x;\n`;
    }
    content(){
        return this.options.taps.map((item,i)=>(
            `
            var _fn${i} = _x[${i}];\n
            _fn${i}(${this.args()});
            `
        )).join('\n');
    }
    create(){
      return new Function(this.args(),this.header()+this.content());
    }
}
/**
function (name, age) {
    var _x = [fn1, fn2];
    var _fn0 = _x[0];
    _fn0(name, age);
    var _fn1 = _x[1];
    _fn1(name, age);
}
 */
module.exports = HookCodeFactory;
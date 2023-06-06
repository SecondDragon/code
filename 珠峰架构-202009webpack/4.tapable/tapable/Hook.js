
class Hook{
  constructor(args){
     if(!Array.isArray(args)) args= [];
     this._args = args;// 用来放参数列表
     this.taps = [];//准备用来放钩子函数,它里存的是对象　[{name:钩子名称,fn:钩子函数}]
     this._x = undefined;//存的都是钩子函数,它里面只有函数
  }
  tap(options, fn) {
    if(typeof options === 'string'){
      options = {name:options};
    }
    options.fn = fn;
    this._insert(options);
  }
  _insert(item){
    this.taps[this.taps.length]=item;
    //this.taps.push(item);
  }
  call(...args){//args=["zhufeng", 10]
    let callMethod = this._createCall();//动态编译出来一个函数
    return callMethod.apply(this,args);//然后执行这个函数,并且传入参数
  }
  _createCall(){
    return this.compile({
      taps:this.taps,//函数数组
      args:this._args//参数数组
    })
  }
}


module.exports = Hook;
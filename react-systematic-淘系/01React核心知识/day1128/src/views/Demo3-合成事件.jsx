import React from "react";

class Demo extends React.Component {
    /* 
    基于React内部的处理，如果我们给合成事件绑定一个“普通函数”，当事件行为触发，绑定的函数执行；方法中的this会是undefined「不好」！！ 解决方案：this->实例
      + 我们可以基于JS中的bind方法：预先处理函数中的this和实参的
      + 推荐：当然也可以把绑定的函数设置为“箭头函数”，让其使用上下文中的this「也就是我们的实例」

    合成事件对象SyntheticBaseEvent：我们在React合成事件触发的时候，也可以获取到事件对象，只不过此对象是合成事件对象「React内部经过特殊处理，把各个浏览器的事件对象统一化后，构建的一个事件对象」
      合成事件对象中，也包含了浏览器内置事件对象中的一些属性和方法「常用的基本都有」
      + clientX/clientY
      + pageX/pageY
      + target
      + type
      + preventDefault
      + stopPropagation
      + ...
      + nativeEvent：基于这个属性，可以获取浏览器内置『原生』的事件对象
      + ...
    */
    handle1() { //Demo.prototype => Demo.prototype.handle=function handle(){}
        console.log(this); //undefined
    }
    handle2(x, y, ev) {
        // 只要方法经过bind处理了，那么最后一个实参，就是传递的合成事件对象！！
        console.log(this, x, y, ev); //实例 10 20 合成事件对象
    }
    handle3 = (ev) => {  //实例.handle3=()=>{....}
        console.log(this); //实例
        console.log(ev); //SyntheticBaseEvent 合成事件对象「React内部经过特殊处理，把各个浏览器的事件对象统一化后，构建的一个事件对象」
    };
    handle4 = (x, ev) => {
        console.log(x, ev); //10 合成事件对象
    };

    render() {
        /*
         bind在React事件绑定的中运用
           + 绑定的方法是一个普通函数，需要改变函数中的this是实例，此时需要用到bind「一般都是绑定箭头函数」
           + 想给函数传递指定的实参，可以基于bind预先处理「bind会把事件对象以最后一个实参传递给函数」 
         */
        return <div>
            <button onClick={this.handle1}>按钮1</button>
            <button onClick={this.handle2.bind(this, 10, 20)}>按钮2</button>
            <button onClick={this.handle3}>按钮3</button>
            <button onClick={this.handle4.bind(null, 10)}>按钮4</button>
        </div>;
    }
}

export default Demo;
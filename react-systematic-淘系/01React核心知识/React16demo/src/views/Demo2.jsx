import React from "react";

class Demo extends React.Component {
    render() {
        return <div className="outer"
            onClick={() => {
                console.log('outer 冒泡「合成」');
            }}
            onClickCapture={() => {
                console.log('outer 捕获「合成」');
            }}>

            <div className="inner"
                onClick={(ev) => {
                    // ev:合成事件对象
                    console.log('inner 冒泡「合成」', ev, ev.type);
                    // ev.stopPropagation(); //合成事件对象中的“阻止事件传播”:阻止原生的事件传播 & 阻止合成事件中的事件传播
                    // ev.nativeEvent.stopPropagation(); //原生事件对象中的“阻止事件传播”:只能阻止原生事件的传播
                    // ev.nativeEvent.stopImmediatePropagation(); //原生事件对象的阻止事件传播，只不过可以阻止document上其它绑定的方法执行
                    // ev.persist(); //可以把合成事件对象中的信息保留下来
                    setTimeout(() => {
                        console.log(ev, ev.type); //合成事件对象还在，但是里面的成员信息都被清空了
                    }, 500);
                }}
                onClickCapture={() => {
                    console.log('inner 捕获「合成」');
                }}
            ></div>

        </div>;
    }

    componentDidMount() {
        document.addEventListener('click', () => {
            console.log('document 捕获');
        }, true);
        document.addEventListener('click', () => {
            console.log('document 冒泡');
        }, false);

        document.body.addEventListener('click', () => {
            console.log('body 捕获');
        }, true);
        document.body.addEventListener('click', () => {
            console.log('body 冒泡');
        }, false);

        let root = document.querySelector('#root');
        root.addEventListener('click', () => {
            console.log('root 捕获');
        }, true);
        root.addEventListener('click', () => {
            console.log('root 冒泡');
        }, false);

        let outer = document.querySelector('.outer');
        outer.addEventListener('click', () => {
            console.log('outer 捕获「原生」');
        }, true);
        outer.addEventListener('click', () => {
            console.log('outer 冒泡「原生」');
        }, false);

        let inner = document.querySelector('.inner');
        inner.addEventListener('click', () => {
            console.log('inner 捕获「原生」');
        }, true);
        inner.addEventListener('click', (ev) => {
            // ev：原生事件对象
            // ev.stopPropagation();
            console.log('inner 冒泡「原生」');
        }, false);
    }
}

export default Demo;


/* 
 React中合成事件的处理原理
    在16版本中，合成事件的处理机制，不再是把事件委托给#root元素，而是委托给document元素，并且只做了冒泡阶段的委托；在委托的方法中，把onXxx/onXxxCapture合成事件属性进行执行！！

 React16中，关于合成事件对象的处理，React内部是基于“事件对象池”，做了一个缓存机制！！React17及以后，是去掉了这套事件对象池和缓存机制的！！
   + 当每一次事件触发的时候，如果传播到了委托的元素上「document/#root」，在委托的方法中，我们首先会对内置事件对象做统一处理，生成合成事件对象！！
     在React16版本中：
     为了防止每一次都是重新创建出新的合成事件对象，它设置了一个事件对象池「缓存池」
       + 本次事件触发，获取到事件操作的相关信息后，我们从 事件对象池 中获取存储的合成事件对象，把信息赋值给相关的成员！
       + 等待本次操作结束，把合成事件对象中的成员信息都清空掉，再放入到 事件对象池 中！！
*/
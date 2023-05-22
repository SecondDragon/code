import React from 'react';
import ReactDOM from 'react-dom/client';
import Demo from './views/Demo5';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <Demo />
    </>
);


/* import Vote from './views/Vote';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <Vote title="React其实还是很好学的!" />
    </>
);

setTimeout(() => {
    root.render(
        <>
            <Vote title="我是五秒后传递的标题" />
        </>
    );
}, 5000); */

/* 
 render函数在渲染的时候，如果type是：
    + 字符串：创建一个标签
    + 普通函数：把函数执行，并且把props传递给函数
    + 构造函数：把构造函数基于new执行「也就是创建类的一个实例」，也会把解析出来的props传递过去
      + 每调用一次类组件都会创建一个单独的实例
      + 把在类组件中编写的render函数执行，把返回的jsx「virtualDOM」当做组件视图进行渲染！！
      例如：
      new Vote({
        title:'React其实还是很好学的!'
      })
 */

/* import Dialog from './components/Dialog';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <Dialog title="友情提示" content="大家出门做好个人防护！" />

        <Dialog content="我们一定要好好学React！">
            <button>确定</button>
            <button>很确定</button>
        </Dialog>
    </>
); */


/* import DemoOne from '@/views/DemoOne';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <DemoOne title="REACT好好玩哦" x={10}>
            <span slot="footer">我是页脚</span>
            <span>哈哈哈哈</span>
            <span slot="header">我是页眉</span>
        </DemoOne>

         <DemoOne title="哇卡卡卡">
            <span>嘿嘿嘿</span>
        </DemoOne>

        <DemoOne title="哈哈哈哈哈" />
    </>
); */
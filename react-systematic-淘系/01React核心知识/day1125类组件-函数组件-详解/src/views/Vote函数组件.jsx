/* 
 函数组件是“静态组件”
   第一次渲染组件，把函数执行
     + 产生一个私有的上下文：EC(V)
     + 把解析出来的props「含children」传递进来「但是被冻结了」
     + 对函数返回的JSX元素「virtualDOM」进行渲染
   当我们点击按钮的时候，会把绑定的小函数执行：
     + 修改上级上下文EC(V)中的变量
     + 私有变量值发生了改变
     + 但是“视图不会更新”
   =>也就是，函数组件第一次渲染完毕后，组件中的内容，不会根据组件内的某些操作，再进行更新，所以称它为静态组件
   =>除非在父组件中，重新调用这个函数组件「可以传递不同的属性信息」

 真实项目中，有这样的需求：第一次渲染就不会再变化的，可以使用函数组件！！
 但是大部分需求，都需要在第一次渲染完毕后，基于组件内部的某些操作，让组件可以更新，以此呈现出不同的效果！！==> 动态组件「方法：类组件、Hooks组件(在函数组件中，使用Hooks函数)」
 */
const Vote = function Vote(props) {
    let { title } = props;
    let supNum = 10,
        oppNum = 5;

    return <div className="vote-box">
        <div className="header">
            <h2 className="title">{title}</h2>
            <span>{supNum + oppNum}人</span>
        </div>
        <div className="main">
            <p>支持人数：{supNum}人</p>
            <p>反对人数：{oppNum}人</p>
        </div>
        <div className="footer">
            <button onClick={() => {
                supNum++;
                console.log(supNum);
            }}>支持</button>

            <button onClick={() => {
                oppNum++;
                console.log(oppNum);
            }}>反对</button>
        </div>
    </div>;
};
export default Vote;
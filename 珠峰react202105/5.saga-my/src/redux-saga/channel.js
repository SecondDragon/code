
function stdChannel(){
    let nexts = [];
    //监听，保存处理函数
    /**
     * 订阅
     * @param {*} actionType 等待的动作类型
     * @param {*} taker 等到之后执行处理函数 next
     */
    function once(actionType,next){
        next.actionType  = actionType;//ASYNC_ADD
        next.cancel = ()=>{
            nexts = nexts.filter(item=>item!==next);
        }
        nexts.push(next);
    }
    //触发，执行处理函数
    function trigger(action){
        //如果数组里有一个next,这的actionType跟你这次派发的动作一样的话就会执行
        nexts.forEach(next=>{
            if(next.actionType === action.type){
                next.cancel();
                next(action);
            }
        });
    }

    return {once,trigger}
}
export default stdChannel;
/* let channel = stdChannel();
channel.on('ASYNC_ADD',(action)=>{
  console.log(action);
});
channel.trigger({type:'ASYNC_ADD'});//eventEmitter once
channel.trigger({type:'ASYNC_ADD'});
channel.trigger({type:'ASYNC_ADD'}); */
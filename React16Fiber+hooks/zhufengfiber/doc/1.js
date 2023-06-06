/**
 * 在Fiber中 很多地方都用到链表
 */
class Update {//payload数据或者 说元素
    constructor(payload, nextUpdate) {
        this.payload = payload;
        this.nextUpdate = nextUpdate;//指向下一个节点的指针
    }
}
class UpdateQueue {
    constructor() {
        this.baseState = null;//原状态
        this.firstUpdate = null;//第一个更新
        this.lastUpdate = null;//最后一个更新
    }
    enqueueUpdate(update) {
        if (this.firstUpdate == null) {
            this.firstUpdate = this.lastUpdate = update;
        } else {
            this.lastUpdate.nextUpdate = update;//上一个最后一个节点的nextUpdate指向自己
            this.lastUpdate = update;//让最后一个节指向自己
        }
    }
    //1.获取老状态。然后遍历这个链表，进行更新 得到新状态
    forceUpdate() {
        let currentState = this.baseState || {};//初始状态
        let currentUpdate = this.firstUpdate;
        while (currentUpdate) {
            let nextState = typeof currentUpdate.payload == 'function' ?
                currentUpdate.payload(currentState) : currentUpdate.payload;
            currentState = { ...currentState, ...nextState };//使用当前更新得到新的状态
            currentUpdate = currentUpdate.nextUpdate;// 找下一个节点
        }
        this.firstUpdate = this.lastUpdate = null;//更新完成后要把链表清空
        this.baseState = currentState;
        return currentState;
    }
}
//计数器 {number:0}  setState({number:1})  setState((state)=>({number:state.number+1}))
let queue = new UpdateQueue();
queue.enqueueUpdate(new Update({ name: 'zhufeng' }));
queue.enqueueUpdate(new Update({ number: 0 }));
queue.enqueueUpdate(new Update((state) => ({ number: state.number + 1 })));
queue.enqueueUpdate(new Update((state) => ({ number: state.number + 1 })));
queue.forceUpdate();
console.log(queue.baseState);
// 因为链表可以很方便的中断和恢复
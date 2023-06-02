import {updateQueue} from './Component';
/**
 * 实现的事件委托，把所有的事件都绑定到document上
 * @param {*} dom 
 * @param {*} eventType 
 * @param {*} handler 
 */
export function addEvent(dom,eventType,handler){//TODO handler
    let store;//这是个对象，时面存放着此DOM上对应的事件处理函数
    //原生DOm身上的一个自定义属性
    if(dom.store){
        store = dom.store;
    }else{
        dom.store={};
        store=dom.store;
    }
    //store.onclick = handler;
    store[eventType]=handler;
    if(!document[eventType])//如果有很多个元素都绑定 click事件，往document挂的时候只挂一次
     document[eventType]=dispatchEvent;

    //document.addEventListener('click',dispatchEvent);
}
//TODO：
// 处理函数挂在真实的触发的dom上，但是事件挂载在document上

function dispatchEvent(event){
    let {target,type} = event;
    //event.target是真实触发的dom节点
    let eventType = `on${type}`;//onclick
    updateQueue.isBatchingUpdate = true;//切换为批量更新模式
    let syntheticEvent = createSyntheticEvent(event);
    //模拟事件冒泡的过程
    while(target){
        //冒泡，找到所有该dom节点的拥有handler的父节点，执行handler。冒泡执行
        let {store} = target;
        let handler = store&&store[eventType];
        handler&&handler.call(target,syntheticEvent);
        //在执行handler的过程中有可能会阻止冒泡
        if (syntheticEvent.isPropagationStopped) {
            break;
        }
        target=target.parentNode;
    }
    updateQueue.isBatchingUpdate = false;
    updateQueue.batchUpdate();
}   
//在源码里此处做了一些浏览器兼容性的适配
function createSyntheticEvent(nativeEvent){
    let syntheticEvent={};
    for(let key in nativeEvent){
        let value = nativeEvent[key];
        if(typeof value === 'function')value=value.bind(nativeEvent);
        syntheticEvent[key] = nativeEvent[key];
    }
    syntheticEvent.nativeEvent = nativeEvent;
    syntheticEvent.isDefaultPrevented = false;
    syntheticEvent.isPropagationStopped = false;
    syntheticEvent.preventDefault = preventDefault;
    syntheticEvent.stopPropagation = stopPropagation;
    return syntheticEvent;
}
//阻止默认事件
function preventDefault() {
    this.defaultPrevented = true;
    const event = this.nativeEvent;
    if (event.preventDefault) {
        event.preventDefault();
    } else {//IE
        event.returnValue = false;
    }
    this.isDefaultPrevented = true;
}
//阻止事件传播
function stopPropagation() {
    const event = this.nativeEvent;
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {//IE
        event.cancelBubble = true;
    }
    this.isPropagationStopped = true;
}
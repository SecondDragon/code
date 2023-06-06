//useRef和creteRef有啥区别吗 
let hookState = [];//源码里用的链表
let hookIndex=0;
//永远指向同一个对象
function useRef(){
    if(!hookState[hookIndex]){
        hookState[hookIndex]={current:null};
    }
    return hookState[hookIndex++];
  
}
useRef()
useRef();

//useRef();
//每次调用都会返回一个新对象
function createRef(){
    return {current:null};
}